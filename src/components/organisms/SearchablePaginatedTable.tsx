import { FC, useEffect, useState } from 'react';
import Table, { TableProps } from '../atoms/table';
import Pagination, { pagenationProps } from '../atoms/pagination/pagination';
import SearchHeader, { SearchHeaderProps } from './SearchHeader';

type Props = {
  searchHeaderProps: SearchHeaderProps;
  tablePrpps: TableProps;
  pagenationProps: pagenationProps;
};

const SearchablePaginatedTable: FC<Props> = ({
  searchHeaderProps: { buttons, searchProps },
  tablePrpps: { columns, data },
  pagenationProps: { total, current, length },
}) => {

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
    const values = columns.map(({value}) => (value));
    const newData = data.map((d: any) => {
      let newObj = {}
      values.forEach((key) => newObj = Object.assign(newObj, { [key]: d[key] }));
      return newObj;
    });
    setTableData(newData);
  }, [data]);

  return (
    <>
      <SearchHeader buttons={buttons} searchProps={searchProps} />
      {data && <Table columns={columns} data={tableData} />}
      <Pagination total={total} current={current} length={length} />
    </>
  );
};

export default SearchablePaginatedTable;
