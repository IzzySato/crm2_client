import { FC, useState } from 'react';
import TableAction from '../../../molecules/tableAction';
import CustomerInputs from '../CustomerInputs';

type Props = {
  data: any;
  actions: {
    update: (data: any) => void;
    delete: (data: any) => void;
  };
};

const CustomerTableAction: FC<Props> = ({ actions, data }) => {
  const [isValidData, setIsVaildData] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({});
  const [updatedAddress, setUpdatedAddress] = useState({});
  const [originalAddress, setOriginalAddress] = useState({});
  return (
    <TableAction
      updateBody={
        // Edit Customer
        <CustomerInputs
          validate={(value) => setIsVaildData(value)}
          isCreate={false}
          setCustomer={(newCustomerData) => setUpdatedCustomer(newCustomerData)}
          setAddress={(newAddressData) => setUpdatedAddress(newAddressData)}
          loadedAddress={(originalData) => setOriginalAddress(originalData)}
          defaultValues={{
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            addresses: data.addresses,
          }}
        />
      }
      id={data._id}
      actions={{
        delete: {
          message: `Delete Customer Id: ${data._id}`,
          action: () => actions.delete(data),
        },
        update: {
          isDisabled: !isValidData,
          action: () => {
            actions.update({
              address: { originalAddress, updatedAddress },
              customer: { originalCustomer: data, updatedCustomer },
            });
          },
        },
      }}
    />
  );
};

export default CustomerTableAction;
