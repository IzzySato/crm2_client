import { FC, useEffect, useState, useRef } from 'react';
import Navbar from '../../components/organisms/Navbar';
import SearchablePaginatedTable from '../../components/organisms/SearchablePaginatedTable';
import GeneralModal from '../../components/molecules/modal';
import Toast from '../../components/atoms/toast';
import { getDifferentObjectOfTwo } from '../../utils/update';
import PRODUCT_PAGE from './constants';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setParams } from '../../store/slices/pages/productPageSlice';
import { ResponseProps } from '../../utils/type/response';

const ProductPage: FC = () => {
  const params = useSelector((state: RootState) => state.product.params);
  const isInitialized = useRef(false);
  const [showToast, setShowToast] = useState(false);
  const [pageLoadClicked, setPageLoadClicked] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [productResponse, setProductResponse] = useState<ResponseProps>({
    total: 0,
    pageNum: 1,
    length: 10,
    data: [],
  });

  const createProduct = async () => {};

  const editProduct = () => {};

  const updateProductTable = () => {};

  const loadProductData = async () => {};

  const deleteProduct = () => {};

  // useEffect(() => {
  //   ;(async () => {
  //    await
  //   })()
  // }, []);

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
          store.dispatch(setParams({ ...params, searchBy: value }));
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
          <></>
        }
        onClose={() => setOpenCreateModal(false)}
        onYes={{ name: 'Create', action: async () => await createProduct() }}
        onNo={{ name: 'Cancel', action: () => setOpenCreateModal(false) }}
      />
    </>
  );
};

export default ProductPage;
