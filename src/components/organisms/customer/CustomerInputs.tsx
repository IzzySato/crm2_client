import { FC, useEffect, useState } from 'react';
import Input from '../../atoms/input';
import AddressInputs from '../address/AddressInputs';

type Props = {
  isCreate?: boolean;
  setCustomer: (data: any) => void;
  setAddress: (data: any) => void;
  setAddressOriginalData?: (data: any) => void;
  defaultValues?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addresses: any;
  };
};

const CustomerInputs: FC<Props> = ({
  isCreate = true,
  defaultValues,
  setCustomer,
  setAddress,
  setAddressOriginalData = () => {},
}) => {
  const [customerData, setCustomerData] = useState({
    firstName: defaultValues?.firstName,
    lastName: defaultValues?.lastName,
    email: defaultValues?.email,
    phone: defaultValues?.phone,
  });

  useEffect(() => {
    // passing to parent
    setCustomer(customerData);
  }, [setCustomer, customerData]);


  return (
    <div className="">
      <div className="mb-2">
        <Input
          value={customerData.firstName}
          placeholder={'First Name'}
          onChange={({ target: { value } }) => {
            setCustomerData({ ...customerData, firstName: value });
          }}
        />
      </div>
      <div className="mb-2">
        <Input
          value={customerData.lastName}
          placeholder={'Last Name'}
          onChange={({ target: { value } }) => {
            setCustomerData({ ...customerData, lastName: value });
          }}
        />
      </div>
      <div className="mb-2">
        <Input
          value={customerData.email}
          placeholder={'email'}
          onChange={({ target: { value } }) => {
            setCustomerData({ ...customerData, email: value });
          }}
        />
      </div>
      <div className="mb-2">
        <Input
          value={customerData.phone}
          placeholder={'phone'}
          onChange={({ target: { value } }) => {
            setCustomerData({ ...customerData, phone: value });
          }}
        />
      </div>
      <div className="mb-2">
        <AddressInputs
          isCreate={isCreate}
          setAddressOriginalData={setAddressOriginalData}
          setAddress={setAddress}
          addressIds={defaultValues?.addresses}
        />
      </div>
    </div>
  );
};

export default CustomerInputs;
