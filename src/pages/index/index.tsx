import { FC, useEffect, useState, useRef } from 'react';
import Navbar from '../../components/organisms/Navbar';
import SearchablePaginatedTable from '../../components/organisms/SearchablePaginatedTable';
import { addCustomer, getCustomers, updateCustomer } from '../../api/customer';
import GeneralModal from '../../components/molecules/modal';
import CustomerInputs from '../../components/organisms/customer/CustomerInputs';
import { addAddress, updateAddress } from '../../api/address';
import Toast from '../../components/atoms/toast';
import CustomerTableAction from '../../components/organisms/customer/table/CustomerTableAction';
import { getDifferentObjectOfTwo } from '../../utils/update';
import CUSTOMER_PAGE, { CUSTOMER_ACTIONS } from './constants';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setCustomerParams } from '../../store/slices/pages/customerPageSlice';
import { ResponseProps } from '../../utils/type/response';

const CustomerPage: FC = () => {
  const params = useSelector((state: RootState) => state.customer.params);
  const isInitialized = useRef(false);
  const [response, setResponse] = useState<ResponseProps>({
    total: 0,
    pageNum: 1,
    length: 10,
    data: [],
  });
  const [isValidData, setIsVaildData] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pageLoadClicked, setPageLoadClicked] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  // For Edit and Delete
  const [customer, setCustomer] = useState({ _id: '' });
  const [address, setAddress] = useState({ _id: ''});
  const [updateTable, setUpdateTable] = useState('');
  const [newUpdatedCustomer, setNewUpdatedCustomer] = useState({});
  const [newUpdatedAddress, setNewUpdatedAddress] = useState({});

  const createCustomer = async () => {
    const { data } = await addAddress(address);
    const addedAddressCustomer = Object.assign(
      { addresses: [data[0]['_id']] },
      customer
    );
    const newCustomerData = [...response.data, data[0]];
    setResponse({
      ...response,
      total: response.total + 1,
      data: newCustomerData,
    });
    await addCustomer(addedAddressCustomer);
    setOpenCreateModal(false);
    setToastMessage('Customer Created');
    setShowToast(true);
  };

  const addActionColumn = (data: any) => {
    return data?.map((c: any) => ({
      ...c,
      actions: (
        <CustomerTableAction
          data={c}
          actions={{
            update: ({ address, customer }) => {
              setCustomer(customer.originalCustomer);
              setNewUpdatedCustomer(customer.updatedCustomer);
              setAddress(address.originalAddress)
              setNewUpdatedAddress(address.updatedAddress);
              setUpdateTable(CUSTOMER_ACTIONS.UPDATE);
            },
            delete: (data) => {
              setCustomer(data);
              setUpdateTable(CUSTOMER_ACTIONS.UPDATE);
            },
          }}
        />
      ),
    }));
  };

  const editCustomer = async () => {
    const customerDifference = getDifferentObjectOfTwo(
      customer,
      newUpdatedCustomer
    );
    if (customerDifference && Object.keys(customerDifference).length > 0) {
      await updateCustomer(customer._id, customerDifference);
      setToastMessage('Customer Updated');
      const updatedData = response.data.map((c) =>
        c._id === customer._id ? { _id: customer._id, ...newUpdatedCustomer } : c
      );
      const updatedTable = addActionColumn(updatedData);
      setResponse({ ...response, data: updatedTable });
    }
  };

  const editAddress = async () => {
    const isAddressNotUpdated = Object.keys(address).filter(
      (key) => String(address[key as keyof Object]) !== ''
    );
    const addressDifference = address
      ? getDifferentObjectOfTwo(newUpdatedAddress, address)
      : {};
    if (address._id === '' && isAddressNotUpdated.length > 0) {
      // add a new address
      const { data } = await addAddress(address);
      await updateCustomer(customer._id, {
        addresses: [data[0]._id],
      });
      setToastMessage('Address Created');
      const updatedData = response.data.map((c) =>
        c._id === customer._id ? { ...c, addresses: data[0]._id } : c
      );
      setResponse(addActionColumn(updatedData));
    }
    if (addressDifference && Object.keys(addressDifference).length > 0) {
      // Update the address
      await updateAddress(address._id, addressDifference);
      setToastMessage('Customer Updated');
    }
  };

  const loadCustomerData = async () => {
    const { data } = await getCustomers(params);
    const addedActionData = addActionColumn(data.data);
    setResponse({ ...data, data: addedActionData });
    setPageLoadClicked(false);
  };

  const deleteCustomer = async () => {
    const today = new Date();
    await updateCustomer(customer._id, { deletedAt: today });
    const filteredCustomers = response.data.filter(
      ({ _id }) => customer._id !== _id
    );
    setResponse({
      ...response,
      total: response.total === 0 ? 0 : response.total - 1,
      data: filteredCustomers,
    });
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

  // Update Delete Customer
  useEffect(() => {
    (async () => {
      if (updateTable === CUSTOMER_ACTIONS.UPDATE) {
        await editCustomer();
        await editAddress();
        setShowToast(true);
      }
      if (updateTable === CUSTOMER_ACTIONS.DELETE) {
        await deleteCustomer();
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
        pageName={CUSTOMER_PAGE.PAGE_NAME.VALUE}
        onSearch={async (value) => {
          store.dispatch(setCustomerParams({ ...params, searchBy: value }));
          await loadCustomerData();
        }}
        response={response}
        actions={[
          {
            name: CUSTOMER_PAGE.ACTIONS.CREATE.NAME,
            onClick: () => setOpenCreateModal(true),
          },
        ]}
        setPageLoadClicked={setPageLoadClicked}
      />
      {/* Create Modal */}
      <GeneralModal
        title="Create Customer"
        testClass="createCustomerModal"
        isDisplay={openCreateModal}
        body={
          <CustomerInputs
            setCustomer={setCustomer}
            setAddress={setAddress}
            validate={(value) => {
              setIsVaildData(value);
            }}
          />
        }
        onClose={() => setOpenCreateModal(false)}
        onYes={{
          name: 'Create',
          isDisabled: !isValidData,
          action: async () => await createCustomer(),
        }}
        onNo={{ name: 'Cancel', action: () => setOpenCreateModal(false) }}
      />
    </>
  );
};

export default CustomerPage;
