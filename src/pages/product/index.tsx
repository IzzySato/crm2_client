import { FC, useEffect, useState, useRef } from 'react';
import Navbar from '../../components/organisms/Navbar';
import SearchablePaginatedTable from '../../components/organisms/SearchablePaginatedTable';
import GeneralModal from '../../components/molecules/modal';
import Toast from '../../components/atoms/toast';
import { getDifferentObjectOfTwo } from '../../utils/update';
import PRODUCT_PAGE from './constants';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setProductParams } from '../../store/slices/pages/productPageSlice';
import { ResponseProps } from '../../utils/type/response';
import ProductInputs from '../../components/organisms/product/ProductInputs';
import { addProduct, getProducts, updateProduct } from '../../api/product';
import Chip from '../../components/atoms/tag/Chip';
import { Link } from 'react-router-dom';
import Button from '../../components/atoms/button';

const ProductPage: FC = () => {
  const params = useSelector((state: RootState) => state.product.params);
  const isInitialized = useRef(false);
  const [showToast, setShowToast] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    _id: '',
    file: '',
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
  const [updateData, setUpdateData] = useState({
    originalData: { _id: '' },
    newData: { name: '' },
  });
  const [deleteId, setDeleteId] = useState('');

  const formatProductData = (data: any) => {
    return data?.map((p: any) => ({
      ...p,
      _id: (
        <Link key={p._id} to={`/product/${p._id}`}>
          {p._id}
        </Link>
      ),
      categoryTags: p.categoryTags.map((tag: string) => (
        <Chip name={tag} readonly />
      )),
    }));
  };

  const createProduct = async () => {
    const {
      data: { data },
    } = await addProduct(newProduct);
    const newProductData = formatProductData([
      ...productResponse.data,
      data[0],
    ]);
    setProductResponse({
      ...productResponse,
      total: productResponse.total + 1,
      data: newProductData,
    });
    setOpenCreateModal(false);
    setNewProduct({
      name: '',
      _id: '',
      file: '',
    });
    setToastMessage('Product Created');
    setShowToast(true);
  };

  const editProduct = async () => {
    const productDifference = getDifferentObjectOfTwo(
      updateData.originalData,
      updateData.newData
    );
    if (productDifference && Object.keys(productDifference).length > 0) {
      await updateProduct(updateData.originalData._id, productDifference);
      setToastMessage('Product Updated');
      const updated = productResponse.data.map((p) =>
        p._id === updateData.originalData._id
          ? { _id: updateData.originalData._id, ...updateData.newData }
          : p
      );
      const updatedTable = formatProductData(updated);
      setProductResponse({ ...productResponse, data: updatedTable });
    }
  };

  const loadProductData = async () => {
    const { data } = await getProducts(params);
    if (data.data.length > 0) {
      const addedActionData = formatProductData(data.data);
      setProductResponse({ ...data, data: addedActionData });
    }
    setPageLoadClicked(false);
  };

  const deleteProduct = async () => {
    const today = new Date();
    await updateProduct(deleteId, { deletedAt: today });
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

  useEffect(() => {
    (async () => {
      if (updateData.originalData._id !== '') {
        await editProduct();
        setUpdateData({ originalData: { _id: '' }, newData: { name: '' } });
      }
    })();
  }, [updateData]);

  useEffect(() => {
    (async () => {
      if (deleteId !== '') {
        await deleteProduct();
        setDeleteId('');
      }
    })();
  }, [deleteId]);

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
          type="default"
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
        onDelete={(id) => console.log(id)}
        onUpdate={(id, data) => console.log(id, data)}
      />
      {/* Create Modal */}
      <GeneralModal
        title="Create Product"
        testClass="createProductModal"
        isDisplay={openCreateModal}
        body={<ProductInputs setProduct={() => {}} />}
        onClose={() => setOpenCreateModal(false)}
        onYes={{
          name: 'Create',
          isDisabled: newProduct.name !== '',
          action: async () => await createProduct(),
        }}
        onNo={{ name: 'Cancel', action: () => setOpenCreateModal(false) }}
      />
    </>
  );
};

export default ProductPage;
