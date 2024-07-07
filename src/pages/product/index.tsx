import { FC, useEffect, useState, useRef } from 'react';
import Navbar from '../../components/organisms/Navbar';
import SearchablePaginatedTable from '../../components/organisms/SearchablePaginatedTable';
import GeneralModal from '../../components/molecules/modal';
import Toast from '../../components/atoms/toast';
import PRODUCT_PAGE from './constants';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setProductParams } from '../../store/slices/pages/productPageSlice';
import { ResponseProps } from '../../utils/type/response';
import ProductInputs from '../../components/organisms/product/ProductInputs';
import { addProduct, getProducts, updateProduct } from '../../api/product';
import Chip from '../../components/atoms/tag/Chip';
import { Link } from 'react-router-dom';
import Button, { ButtonType } from '../../components/atoms/button';

const ProductPage: FC = () => {
  const params = useSelector((state: RootState) => state.product.params);
  const isInitialized = useRef(false);
  const [showToast, setShowToast] = useState(false);
  const [newProduct, setNewProduct] = useState<any>({
    name: '',
    sku: '',
  });
  const [pageLoadClicked, setPageLoadClicked] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [productResponse, setProductResponse] = useState<ResponseProps>({
    total: 0,
    pageNum: 1,
    length: 10,
    data: [],
  });

  const formatProductData = (data: any) => {
    const link = (_id: string) => (
      <Link key={_id} to={`/product/${_id}`}>
        {_id}
      </Link>
    );
    const categoryTags = (tags: any) =>
      tags.map((tag: string) => <Chip key={tag} name={tag} readonly />);
    return Array.isArray(data)
      ? data?.map((p: any) => ({
          ...p,
          _id: link(p._id),
          categoryTags: categoryTags(p.categoryTags),
        }))
      : {
          ...data,
          _id: link(data._id),
          categoryTags: categoryTags(data.categoryTags),
        };
  };

  const createProduct = async () => {
    const {
      data: { data },
    } = await addProduct(newProduct);
    setProductResponse({
      ...productResponse,
      total: productResponse.total + 1,
      data: [...productResponse.data, formatProductData(data[0])],
    });
    setOpenCreateModal(false);
    setNewProduct({ name: '', sku: '' });
    setToastMessage('Product Created');
    setShowToast(true);
  };

  const editProduct = async (id: string, newData: any) => {
    if (Object.keys(newData).length === 0) {
      return;
    }
    const { data } = await updateProduct(id, newData);
    setToastMessage('Product Updated');
    const updated = productResponse.data.map((p) =>
      p._id.key === id ? formatProductData(data) : p
    );
    setProductResponse({
      ...productResponse,
      data: updated,
    });
  };

  const loadProductData = async () => {
    const { data } = await getProducts(params);
    if (data.data.length > 0) {
      const addedActionData = formatProductData(data.data);
      setProductResponse({ ...data, data: addedActionData });
    }
    setPageLoadClicked(false);
  };

  const deleteProduct = async (id: string) => {
    const today = new Date();
    await updateProduct(id, { deletedAt: today });
    await loadProductData();
    setToastMessage('Product Deleted');
    setShowToast(true);
  };

  // First rendered the page or pageLoadClicked is true
  useEffect(() => {
    if (!isInitialized.current || pageLoadClicked) {
      (async () => {
        await loadProductData();
      })();
      isInitialized.current = true;
    }
  }, [pageLoadClicked]);

  return (
    <>
      <Navbar />
      <Toast
        status="success"
        isDisplay={showToast}
        message={toastMessage}
        setDisplay={setShowToast}
      />
      <div className="page-px mt-3">
        <Button
          type={ButtonType.Default}
          text="Create"
          onClick={() => setOpenCreateModal(true)}
        />
      </div>
      <SearchablePaginatedTable
        pageName={PRODUCT_PAGE.PAGE_NAME.VALUE}
        onSearch={async (value) => {
          store.dispatch(setProductParams({ ...params, searchBy: value }));
          await loadProductData();
        }}
        response={productResponse}
        setPageLoadClicked={setPageLoadClicked}
        onDelete={async (id) => await deleteProduct(id.key)}
        onUpdate={async (id, data) => await editProduct(id.key, data)}
      />
      {/* Create Modal */}
      <GeneralModal
        title="Create Product"
        testClass="createProductModal"
        isDisplay={openCreateModal}
        body={<ProductInputs setProduct={(data) => setNewProduct(data)} />}
        onClose={() => setOpenCreateModal(false)}
        onYes={{
          name: 'Create',
          isDisabled: newProduct.name === '' || newProduct.sku === '',
          action: async () => await createProduct(),
        }}
        onNo={{ name: 'Cancel', action: () => setOpenCreateModal(false) }}
      />
    </>
  );
};

export default ProductPage;
