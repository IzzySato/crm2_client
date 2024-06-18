import { FC } from 'react';
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
  return (
    <>
      <SearchHeader buttons={buttons} searchProps={searchProps} />
      {data && <Table columns={columns} data={data} />}
      <Pagination total={total} current={current} length={length} />
    </>
  );
};

export default SearchablePaginatedTable;
