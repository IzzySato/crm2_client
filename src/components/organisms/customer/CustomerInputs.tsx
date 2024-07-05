import { FC, useEffect, useState } from 'react';
import AddressInputs from '../address/AddressInputs';
import InputField from '../../molecules/inputField/InputField';
import { validateEmail } from '../../../utils/validate/inputValidation';

type Props = {
  isCreate?: boolean;
  setCustomer: (data: any) => void;
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
}) => {
  const [customerData, setCustomerData] = useState({
    firstName: defaultValues?.firstName || '',
    lastName: defaultValues?.lastName || '',
    email: defaultValues?.email || '',
    phone: defaultValues?.phone || '',
  });

  const [address, setAddress] = useState({
    _id: '',
    line1: '',
    line2: '',
    city: '',
    province: '',
    postcode: '',
  });

  useEffect(() => {
    // passing to parent
    let addressData = null;
    if (
      address.line1 !== '' ||
      address.city !== '' ||
      address.province !== '' ||
      address.postcode !== ''
    ) {
      addressData = {
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        province: address.province,
        postcode: address.postcode,
      };
    }
    if (address._id !== '') {
      addressData = {
        ...addressData, _id: address._id
      }
    }
    setCustomer({ ...customerData, address: addressData });
  }, [customerData, address]);

  return (
    <>
      <div className="mb-2">
        <InputField
          error={customerData.firstName === '' ? 'First name is required' : ''}
          inputProps={{
            value: customerData.firstName,
            label: 'First Name',
            isRequired: true,
            placeholder: 'John',
            onChange: ({ target: { value } }) => {
              setCustomerData({ ...customerData, firstName: value });
            },
          }}
        />
      </div>
      <div className="mb-2">
        <InputField
          error={customerData.lastName === '' ? 'Last name is required' : ''}
          inputProps={{
            value: customerData.lastName,
            label: 'Last Name',
            isRequired: true,
            placeholder: 'Smith',
            onChange: ({ target: { value } }) => {
              setCustomerData({ ...customerData, lastName: value });
            },
          }}
        />
      </div>
      <div className="mb-2">
        <InputField
          error={validateEmail(customerData.email) ? '' : 'invalid email'}
          inputProps={{
            isRequired: true,
            value: customerData.email,
            label: 'email',
            placeholder: 'john.smith@mail.com',
            onChange: ({ target: { value } }) => {
              setCustomerData({ ...customerData, email: value });
            },
          }}
        />
      </div>
      <div className="mb-2">
        <InputField
          error={customerData.phone === '' ? 'phone number is required' : ''}
          inputProps={{
            value: customerData.phone,
            label: 'Phone',
            placeholder: '6042452678',
            onChange: ({ target: { value } }) => {
              setCustomerData({ ...customerData, phone: value });
            },
          }}
        />
      </div>
      <div className="mb-2">
        <AddressInputs
          isCreate={isCreate}
          setAddress={(data) => setAddress(data)}
          addressIds={defaultValues?.addresses}
        />
      </div>
    </>
  );
};

export default CustomerInputs;
