import { FC, useEffect, useState } from 'react';
import Navbar from '../../components/organisms/Navbar';
import SearchablePaginatedTable from '../../components/organisms/SearchablePaginatedTable';

const Index: FC = () => {
  // const [isReady, setIsReady] = useState(false)

  // useEffect(() => {
  //   ;(async () => {
  //   })();
  // }, []);

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
  ];

  const customerData = {
    total: 12,
    pageNum: 1,
    length: 10,
    data: [
      {
        id: '12331',
        firstName: 'Alice',
        lastName: 'Brown',
        email: 'alice.brown@gmail.com',
        phone: '123-134-5678',
      },
      {
        id: '12332',
        firstName: 'Alice',
        lastName: 'Brown',
        email: 'alice.brown@gmail.com',
        phone: '123-134-5678',
      },
      {
        id: '12333',
        firstName: 'Alice',
        lastName: 'Brown',
        email: 'alice.brown@gmail.com',
        phone: '123-134-5678',
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <SearchablePaginatedTable
        tablePrpps={{ columns: customerColumns, data: customerData.data }}
        pagenationProps={{
          total: customerData.total,
          current: customerData.pageNum,
          length: customerData.length,
        }}
      />
    </div>
  );
};

export default Index;
