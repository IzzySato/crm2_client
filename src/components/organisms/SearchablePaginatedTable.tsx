import { FC, useEffect, useState } from 'react';
import Table from '../atoms/table/table';
import Pagination from '../atoms/pagination/pagination';

type Props = {
  tablePrpps: {
    columns: {
      name: string;
      value: string;
    }[];
    data: any;
  },
  pagenationProps: {
    total: number
  }
};

const SearchablePaginatedTable: FC<Props> = ({tablePrpps: {columns, data}, pagenationProps: { total }}) => {
  // const [isReady, setIsReady] = useState(false)

  // useEffect(() => {
  //   ;(async () => {
  //   })();
  // }, []);

  return (
    <>
      <Table columns={columns} data={data}/>
      <Pagination total={total}/>
    </>
  );
};

export default SearchablePaginatedTable;
