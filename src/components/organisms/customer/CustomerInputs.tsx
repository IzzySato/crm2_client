import { FC, useEffect, useState } from 'react';
import Input from '../../atoms/input';
import AddressInputs from '../address/AddressInputs';

type Props = {
  setCustomer: (data: any) => void;
  setAddress: (data: any) => void;
};

const CustomerInputs: FC<Props> = ({ setAddress, setCustomer }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
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
          onChange={({ target: { value } }) => setCustomerData({ ...customerData, firstName: value})}
        />
      </div>
      <div className="mb-2">
        <Input
          value={customerData.lastName}
          placeholder={'Last Name'}
          onChange={({ target: { value } }) => setCustomerData({ ...customerData, lastName: value})}
        />
      </div>
      <div className="mb-2">
        <Input
          value={customerData.email}
          placeholder={'email'}
          onChange={({ target: { value } }) => setCustomerData({ ...customerData, email: value})}
        />
      </div>
      <div className="mb-2">
        <Input
          value={customerData.phone}
          placeholder={'phone'}
          onChange={({ target: { value } }) => setCustomerData({ ...customerData, phone: value})}
        />
      </div>
      <div className="mb-2">
        <AddressInputs setAddress={(data) => setAddress(data)}/>
      </div>
    </div>
  );
};

export default CustomerInputs;
