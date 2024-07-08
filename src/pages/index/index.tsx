import { FC, useEffect, useState, useRef } from 'react';
import Navbar, { PAGE_NAME } from '../../components/organisms/Navbar';
import SearchablePaginatedTable from '../../components/organisms/SearchablePaginatedTable';
import { addCustomer, getCustomers, updateCustomer } from '../../api/customer';
import GeneralModal from '../../components/molecules/modal';
import CustomerInputs from '../../components/organisms/customer/CustomerInputs';
import { addAddress, updateAddress } from '../../api/address';
import Toast from '../../components/atoms/toast';
import CUSTOMER_PAGE from './constants';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setCustomerParams } from '../../store/slices/pages/customerPageSlice';
import { ResponseProps } from '../../utils/type/response';
import { validateEmail } from '../../utils/validate/inputValidation';
import Button, { ButtonType } from '../../components/atoms/button';

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
    const addressId = await editAddress(newData.address);
    if (Object.keys(newData).length === 0) {
      return;
    }
    if (addressId) {
      newData.addressIds = [addressId];
    }
    delete newData.address;
    await updateCustomer(id, newData);
    setToastMessage('Customer Updated');
    const updatedData = response.data.map((c) =>
      c._id === id
        ? {
            _id: id,
            ...newData,
            addresses: newData.addressIds || c.addresses,
          }
        : c
    );
    setResponse({ ...response, data: updatedData });
  };

  const editAddress = async (newAddressData: any) => {
    if (Object.keys(newAddressData).length === 0) {
      return null;
    }
    if (newAddressData._id) {
      const id = newAddressData._id;
      delete newAddressData._id;
      // Update the address
      await updateAddress(id, newAddressData);
      setToastMessage('Address Updated');
      setShowToast(true);
      return null;
    } else {
      // add a new address and return address id
      const { data } = await addAddress(newAddressData);
      setToastMessage('Address Created');
      setShowToast(true);
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
      <Navbar current={PAGE_NAME.CUSTOMER} />
      <Toast
        status="success"
        isDisplay={showToast}
        message={toastMessage}
        setDisplay={setShowToast}
      />
      <div className="page-px mt-3 block sm:absolute">
        <Button
          type={ButtonType.Default}
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
