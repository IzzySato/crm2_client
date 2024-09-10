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
  const [isValid, setIsValid] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [customer, setCustomer] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    addresses: [],
  });

  useEffect(() => {
    setIsValid(
      customer.firstName !== '' &&
        customer.lastName !== '' &&
        customer.email !== '' &&
        customer.phone !== '' &&
        validateEmail(customer.email) !== null
    );
  }, [customer]);

  const createCustomer = async () => {
    const addresses: Array<string> = [];
    if (customer.addresses) {
      const { data } = await addAddress(customer.addresses);
      addresses.push(data[0].id);
    }
    const {
      data: { data },
    } = await addCustomer({ ...customer, addresses });
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

  const editAddress = async (newAddressData: any) => {
    if (!newAddressData) {
      return null;
    }
    if (newAddressData.id) {
      const id = newAddressData.id;
      delete newAddressData.id;
      // Update the address
      await updateAddress(id, newAddressData);
      setToastMessage('Address Updated');
      setShowToast(true);
      return null;
    } else {
      // add a new address and return address id
      const {
        data: { data },
      } = await addAddress(newAddressData);
      setToastMessage('Address Created');
      setShowToast(true);
      return data[0].id;
    }
  };

  const editCustomer = async (id: string, newData: any) => {
    const addresses = await editAddress(newData.address);
    if (Object.keys(newData).length === 0) {
      return;
    }
    if (addresses) {
      newData.addresses = [addresses];
    }
    await updateCustomer(id, newData);
    setToastMessage('Customer Updated');
    const updatedData = response.data.map((c) =>
      c.id === id
        ? {
            id,
            ...c,
            ...newData,
            addresses: newData.addresses ?? c.addresses,
          }
        : c
    );
    setResponse({ ...response, data: updatedData });
  };

  const loadCustomerData = async (newParam = params) => {
    const { data } = await getCustomers(newParam);
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
          testClass="customerCreateBtn"
          text="Create"
          onClick={() => setOpenCreateModal(true)}
        />
      </div>
      <SearchablePaginatedTable
        pageName={CUSTOMER_PAGE.PAGE_NAME.VALUE}
        onSearch={async (value) => {
          const newParam = { ...params, searchBy: value };
          store.dispatch(setCustomerParams(newParam));
          await loadCustomerData(newParam);
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
        body={<CustomerInputs setCustomer={setCustomer} />}
        onClose={() => setOpenCreateModal(false)}
        onYes={{
          name: 'Create',
          isDisabled: !isValid,
          action: async () => await createCustomer(),
        }}
        onNo={{ name: 'Cancel', action: () => setOpenCreateModal(false) }}
      />
    </>
  );
};

export default CustomerPage;
