import { FC, useEffect, useState } from 'react';
import Navbar from '../../components/organisms/Navbar';
import SearchablePaginatedTable from '../../components/organisms/SearchablePaginatedTable';
import { addCustomer, getCustomers } from '../../api/customer';
import TableAction from '../../components/molecules/tableAction';
import GeneralModal from '../../components/molecules/modal';
import CustomerInputs from '../../components/organisms/customer/CustomerInputs';

const Index: FC = () => {
  const [customerData, setCustomerData] = useState({
    total: 0,
    pageNum: 1,
    length: 10,
    data: [],
  });

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [customer, setCustomer] = useState({});
  const [address, setAddress] = useState({});

  const createCustomer = async () => {
    // await addArress(address);
    await addCustomer(customer);
  };

  useEffect(() => {
    (async () => {
      const { data } = await getCustomers({
        pageNum: 1,
        length: 10,
        sortBy: 'firstName',
        fields: 'firstName lastName email phone _id',
      });
      const addedActionData = data.data?.map((d: any) => ({
        ...d,
        actions: <TableAction id={d._id} />,
      }));
      setCustomerData({ ...data, data: addedActionData });
    })();
  }, []);

  const customerColumns = [
    {
      name: 'ID',
      value: 'id',
    },
    {
      name: 'First Name',
      value: 'firstName',
    },
    {
      name: 'Last Name',
      value: 'lastName',
    },
    {
      name: 'Email',
      value: 'email',
    },
    {
      name: 'Phone',
      value: 'phone',
    },
    {
      name: 'Actions',
      value: 'actions',
    },
  ];

  return (
    <>
      <Navbar />
      <SearchablePaginatedTable
        searchHeaderProps={{
          buttons: [
            {
              loading: false,
              text: 'Create',
              type: 'default',
              onClick: () => setOpenCreateModal(true),
            },
          ],
          searchProps: {
            loading: false,
            placeholder: 'Search Customer (e.g. first name, last name, email)',
            onSearch: () => {},
            onChange: () => {},
          },
        }}
        tablePrpps={{ columns: customerColumns, data: customerData.data }}
        pagenationProps={{
          total: customerData.total,
          current: customerData.pageNum,
          length: customerData.length,
        }}
      />
      {/* Create Modal */}
      <GeneralModal
        title="Create Customer"
        isDisplay={openCreateModal}
        body={
          <CustomerInputs setCustomer={setCustomer} setAddress={setAddress} />
        }
        onClose={() => setOpenCreateModal(false)}
        onYes={{ name: 'Create', action: async () => await createCustomer() }}
        onNo={{ name: 'Cancel', action: () => setOpenCreateModal(false) }}
      />
    </>
  );
};

export default Index;
