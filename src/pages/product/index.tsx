import { FC, useEffect, useState, useRef } from 'react';
import Navbar from '../../components/organisms/Navbar';
import SearchablePaginatedTable from '../../components/organisms/SearchablePaginatedTable';
import GeneralModal from '../../components/molecules/modal';
import Toast from '../../components/atoms/toast';
import { getDifferentObjectOfTwo } from '../../utils/update';
import PRODUCT_PAGE, { PRODUCT_ACTIONS } from './constants';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setProductParams } from '../../store/slices/pages/productPageSlice';
import { ResponseProps } from '../../utils/type/response';
import ProductInputs from '../../components/organisms/product/ProductInputs';
import { addProduct, getProducts, updateProduct } from '../../api/product';
import ProductTableAction from '../../components/organisms/product/table/ProductTableAction';
import Chip from '../../components/atoms/tag/Chip';

const ProductPage: FC = () => {
  const params = useSelector((state: RootState) => state.product.params);
  const isInitialized = useRef(false);
  const [showToast, setShowToast] = useState(false);
  const [isValidData, setIsVaildData] = useState(false);
  const [product, setProduct] = useState({
    _id: '',
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
  const [updateTable, setUpdateTable] = useState('');
  const [newUpdatedProduct, setNewUpdatedProduct] = useState({});

  const createProduct = async () => {
    const {
      data: { data },
    } = await addProduct(product);
    const newProductData = [...productResponse.data, data[0]];
    setProductResponse({
      ...productResponse,
      total: productResponse.total + 1,
      data: newProductData });
    setOpenCreateModal(false);
    setToastMessage('Product Created');
    setShowToast(true);
  };

  const addActionColumn = (data: any) => {
    return data?.map((p: any) => ({
      ...p,
      categoryTags: p.categoryTags.map((tag: string) => (
        <Chip name={tag} readonly />
      )),
      actions: (
        <ProductTableAction
          data={p}
          actions={{
            update: ({ originalData, newUpdatedData }) => {
              setProduct(originalData);
              setNewUpdatedProduct(newUpdatedData);
              setUpdateTable(PRODUCT_ACTIONS.UPDATE);
            },
            delete: (data) => {
              setProduct(data);
              setUpdateTable(PRODUCT_ACTIONS.DELETE);
            },
          }}
        />
      ),
    }));
  };

  const editProduct = async () => {
    const productDifference = getDifferentObjectOfTwo(
      product,
      newUpdatedProduct
    );
    if (productDifference && Object.keys(productDifference).length > 0) {
      await updateProduct(product._id, productDifference);
      setToastMessage('Product Updated');
      const updatedData = productResponse.data.map((p) =>
        p._id === product._id ? { _id: product._id, ...newUpdatedProduct } : p
      );
      const updatedTable = addActionColumn(updatedData);
      setProductResponse({ ...productResponse, data: updatedTable });
    }
  };

  const loadProductData = async () => {
    const { data } = await getProducts(params);
    if (data.data.length > 0) {
      const addedActionData = addActionColumn(data.data);
      setProductResponse({ ...data, data: addedActionData });
    }
    setPageLoadClicked(false);
  };

  const deleteProduct = async () => {
    const today = new Date();
    await updateProduct(product._id, { deletedAt: today });
    const filteredProducts = productResponse.data.filter(
      ({ _id }) => product._id !== _id
    );
    setProductResponse({ 
      ...productResponse,
      total: productResponse.total === 0 ? 0 : productResponse.total - 1,
      data: filteredProducts });
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

  // Update Delete Product
  useEffect(() => {
    (async () => {
      if (updateTable === PRODUCT_ACTIONS.UPDATE) {
        await editProduct();
      }
      if (updateTable === PRODUCT_ACTIONS.DELETE) {
        await deleteProduct();
      }
      setUpdateTable('');
    })();
  }, [updateTable]);

  return (
    <>
      <Navbar />
      <Toast
        status="success"
        isDisplay={showToast}
        message={toastMessage}
        setDisplay={setShowToast}
      />
      <SearchablePaginatedTable
        pageName={PRODUCT_PAGE.PAGE_NAME.VALUE}
        onSearch={async (value) => {
          store.dispatch(setProductParams({ ...params, searchBy: value }));
          await loadProductData();
        }}
        response={productResponse}
        actions={[
          {
            name: PRODUCT_PAGE.ACTIONS.CREATE.NAME,
            onClick: () => setOpenCreateModal(true),
          },
        ]}
        setPageLoadClicked={setPageLoadClicked}
      />
      {/* Create Modal */}
      <GeneralModal
        title="Create Product"
        testClass="createProductModal"
        isDisplay={openCreateModal}
        body={
          <ProductInputs
            setProduct={setProduct}
            validate={(value) => setIsVaildData(value)}
          />
        }
        onClose={() => setOpenCreateModal(false)}
        onYes={{
          name: 'Create',
          isDisabled: !isValidData,
          action: async () => await createProduct(),
        }}
        onNo={{ name: 'Cancel', action: () => setOpenCreateModal(false) }}
      />
    </>
  );
};

export default ProductPage;
