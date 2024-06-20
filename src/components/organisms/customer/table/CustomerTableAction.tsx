import { FC } from 'react';
import TableAction from '../../../molecules/tableAction';
import CustomerInputs from '../CustomerInputs';

type Props = {
  data: any,
  actions: {
    update: (data: any) => void
    delete: (id: string) => void
  },
  setters: {
    setCustomer: (data: any) => void
    setAddress: (data: any) => void
    setAddressOriginalData: (data: any) => void
  }
};

const CustomerTableAction: FC<Props> = ({ actions, data, setters }) => {
  return (
    <TableAction
    updateBody={
      <CustomerInputs
        isCreate={false}
        setCustomer={(newCustomerData) => setters.setCustomer(newCustomerData)}
        setAddress={(newAddressData) => setters.setAddress(newAddressData)}
        setAddressOriginalData={(originalData) => setters.setAddressOriginalData(originalData)}
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
        action: () => actions.delete(data._id),
      },
      update: {
        action: () => {
          actions.update(data)
        },
      },
    }}
  />
  );
};

export default CustomerTableAction;
