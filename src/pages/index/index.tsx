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
import CUSTOMER_PAGE from './constants';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setParams } from '../../store/slices/pages/customerPageSlice';
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
  const [validCustomerData, setValidCustomerData] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pageLoadClicked, setPageLoadClicked] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  // For Edit and Craete new customer data
  const [customer, setCustomer] = useState({});
  const [address, setAddress] = useState({});
  // For Edit
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [customerOriginalData, setCustomerOriginalData] = useState({
    _id: '',
  });
  const [addressOriginalData, setAddressOriginalData] = useState({
    _id: '',
  });

  const createCustomer = async () => {
    const { data } = await addAddress(address);
    const addedAddressCustomer = Object.assign(
      { addresses: [data[0]['_id']] },
      customer
    );
    await addCustomer(addedAddressCustomer);
    setOpenCreateModal(false);
    setToastMessage('Customer Created');
    setShowToast(true);
  };

  const updateCustomerTableData = (id: string, newData: any) => {
    const newTableData = response.data.map((customer) => {
      if (customer['_id'] === id) {
        const newCustomer = Object.assign(customer, newData);
        const updatedAction = Object.assign(newCustomer, {
          actions: (
            <CustomerTableAction
              data={newCustomer}
              actions={{
                update: editClickedFunc,
                delete: deleteCustomer,
              }}
              setters={{
                setCustomer,
                setAddress,
                setAddressOriginalData,
              }}
            />
          ),
        });
        return updatedAction;
      }
      return customer;
    });
    const newObj = Object.assign(response, { data: newTableData });
    setResponse(newObj);
  };

  const editCustomer = async () => {
    const customerDifference = getDifferentObjectOfTwo(
      customerOriginalData,
      customer
    );
    if (customerDifference && Object.keys(customerDifference).length > 0) {
      await updateCustomer(customerOriginalData._id, customerDifference);
      setToastMessage('Customer Updated');
      updateCustomerTableData(customerOriginalData._id, customer);
    }
  };

  const editAddress = async () => {
    const isAddressNotUpdated = Object.keys(address).filter(
      (key) => String(address[key as keyof Object]) !== ''
    );
    const addressDifference = addressOriginalData
      ? getDifferentObjectOfTwo(addressOriginalData, address)
      : {};
    if (addressOriginalData._id === '' && isAddressNotUpdated.length > 0) {
      const { data } = await addAddress(address);
      await updateCustomer(customerOriginalData._id, {
        addresses: [data[0]._id],
      });
      setToastMessage('Address Created');
      updateCustomerTableData(customerOriginalData._id, {
        addresses: [data[0]._id],
      });
    }
    if (addressDifference && Object.keys(addressDifference).length > 0) {
      await updateAddress(addressOriginalData._id, addressDifference);
      setToastMessage('Customer Updated');
    }
  };

  const editCustomerAddress = async () => {
    await editCustomer();
    await editAddress();
    setShowToast(true);
  };

  useEffect(() => {
    (async () => {
      if (isEditClicked) {
        await editCustomerAddress();
      }
      setIsEditClicked(false);
    })();
  }, [
    addressOriginalData,
    customerOriginalData,
    isEditClicked,
    customer,
    address,
  ]);

  const editClickedFunc = (data: any) => {
    setIsEditClicked(true);
    setCustomerOriginalData(data);
  };

  const loadresponse = async () => {
    const { data } = await getCustomers(params);
    const addedActionData = data.data?.map((d: any) => {
      return {
        _id: d._id,
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        phone: d.phone,
        addresses: d.addresses,
        actions: (
          <CustomerTableAction
            data={d}
            actions={{
              update: editClickedFunc,
              delete: deleteCustomer,
            }}
            setters={{
              setCustomer,
              setAddress,
              setAddressOriginalData,
            }}
          />
        ),
      };
    });
    setResponse({ ...data, data: addedActionData });
    setPageLoadClicked(false);
  };

  const deleteCustomer = async (id: string) => {
    const today = new Date();
    await updateCustomer(id, { deletedAt: today });
    await loadresponse();
    setToastMessage('Customer Deleted');
    setShowToast(true);
  };

  // First rendered the page or pageLoadClicked is true
  useEffect(() => {
    if (!isInitialized.current || pageLoadClicked) {
      (async () => {
        await loadresponse();
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
      <SearchablePaginatedTable
        pageName={CUSTOMER_PAGE.PAGE_NAME.VALUE}
        onSearch={async (value) => {
          store.dispatch(setParams({ ...params, searchBy: value }));
          await loadresponse();
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
              setValidCustomerData(value);
            }}
          />
        }
        onClose={() => setOpenCreateModal(false)}
        onYes={{ name: 'Create', isDisabled: !validCustomerData, action: async () => await createCustomer() }}
        onNo={{ name: 'Cancel', action: () => setOpenCreateModal(false) }}
      />
    </>
  );
};

export default CustomerPage;
