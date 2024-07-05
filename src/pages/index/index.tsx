import { FC, useEffect, useState, useRef } from 'react';
import Navbar from '../../components/organisms/Navbar';
import SearchablePaginatedTable from '../../components/organisms/SearchablePaginatedTable';
import { addCustomer, getCustomers, updateCustomer } from '../../api/customer';
import GeneralModal from '../../components/molecules/modal';
import CustomerInputs from '../../components/organisms/customer/CustomerInputs';
import { addAddress, updateAddress } from '../../api/address';
import Toast from '../../components/atoms/toast';
import { getDifferentObjectOfTwo } from '../../utils/update';
import CUSTOMER_PAGE from './constants';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setCustomerParams } from '../../store/slices/pages/customerPageSlice';
import { ResponseProps } from '../../utils/type/response';
import { validateEmail } from '../../utils/validate/inputValidation';
import Button from '../../components/atoms/button';

const CustomerPage: FC = () => {
  const params = useSelector((state: RootState) => state.customer.params);
  const isInitialized = useRef(false);
  const [response, setResponse] = useState<ResponseProps>({
    total: 0,
    pageNum: 1,
    length: 10,
    data: [],
  });
  const [showToast, setShowToast] = useState(false);
  const [pageLoadClicked, setPageLoadClicked] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [customer, setCustomer] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    address: {},
  });

  const isValid = (data: any) => {
    return (
      data.firstName !== '' &&
      data.lastName !== '' &&
      data.email !== '' &&
      validateEmail(data.email) !== null
    );
  };

  const createCustomer = async () => {
    const addressIds: Array<string> = [];
    if (customer.address) {
      const { data } = await addAddress(customer.address);
      addressIds.push(data[0]._id);
    }
    const { data } = await addCustomer({ ...customer, addressIds });
    const newCustomerData = [...response.data, data[0]];
    setResponse({
      ...response,
      total: response.total + 1,
      data: newCustomerData,
    });
    setOpenCreateModal(false);
    setToastMessage('Customer Created');
    setShowToast(true);
  };

  const editCustomer = async (id: string, newData: any) => {
    const originalCustomerData = response.data.find(({ _id }) => _id === id);
    const addressId = await editAddress(originalCustomerData, newData);
    const customerDifference = getDifferentObjectOfTwo(
      originalCustomerData,
      newData
    );
    if (!addressId && Object.keys(customerDifference).length === 0) {
      return;
    }
    await updateCustomer(id, {
      ...customerDifference,
      addressIds: [addressId] || [],
    });
    setToastMessage('Customer Updated');
    const updatedData = response.data.map((c) =>
      c._id === id ? { _id: id, ...newData, addressIds: [addressId] || [] } : c
    );
    setResponse({ ...response, data: updatedData });
  };

  const editAddress = async (originalCustomerData: any, newData: any) => {
    const addressDifference = getDifferentObjectOfTwo(
      originalCustomerData.address,
      newData.address
    );
    if (Object.keys(addressDifference).length === 0) {
      return;
    }
    if (newData.address._id) {
      // Update the address
      await updateAddress(newData._id, addressDifference);
      setToastMessage('Customer Updated');
    } else {
      // add a new address and return address id
      const { data } = await addAddress(newData.address);
      return data[0]._id;
    }
  };

  const loadCustomerData = async () => {
    const { data } = await getCustomers(params);
    setResponse(data);
    setPageLoadClicked(false);
  };

  const deleteCustomer = async (id: string) => {
    const today = new Date();
    await updateCustomer(id, { deletedAt: today });
    await loadCustomerData();
    setToastMessage('Customer Deleted');
    setShowToast(true);
  };

  // First rendered the page or pageLoadClicked is true
  useEffect(() => {
    if (!isInitialized.current || pageLoadClicked) {
      (async () => {
        await loadCustomerData();
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
      <div className='page-px mt-3'>
        <Button
          type="default"
          text="Create"
          onClick={() => setOpenCreateModal(true)}
        />
      </div>
      <SearchablePaginatedTable
        pageName={CUSTOMER_PAGE.PAGE_NAME.VALUE}
        onSearch={async (value) => {
          store.dispatch(setCustomerParams({ ...params, searchBy: value }));
          await loadCustomerData();
        }}
        response={response}
        setPageLoadClicked={setPageLoadClicked}
        onDelete={async (id) => await deleteCustomer(id)}
        onUpdate={async (id, data) => await editCustomer(id, data)}
      />
      {/* Create Modal */}
      <GeneralModal
        title="Create Customer"
        testClass="createCustomerModal"
        isDisplay={openCreateModal}
        body={<CustomerInputs isCreate setCustomer={setCustomer} />}
        onClose={() => setOpenCreateModal(false)}
        onYes={{
          name: 'Create',
          isDisabled: !isValid(customer),
          action: async () => await createCustomer(),
        }}
        onNo={{ name: 'Cancel', action: () => setOpenCreateModal(false) }}
      />
    </>
  );
};

export default CustomerPage;
