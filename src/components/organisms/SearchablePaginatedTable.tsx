import { FC, useEffect, useState } from 'react';
import Table from '../atoms/table';
import Pagination from '../atoms/pagination/pagination';
import SearchHeader from './SearchHeader';
import { getPageInfo } from '../../utils/pageHelper';
import NoTableData from './NoTableData';
import TableAction from '../molecules/tableAction';
import CUSTOMER_PAGE from '../../pages/index/constants';
import PRODUCT_PAGE from '../../pages/product/constants';
import CustomerInputs from './customer/CustomerInputs';
import ProductInputs from './product/ProductInputs';

type Props = {
  onSearch: (value: string) => void;
  response: any;
  pageName: string;
  setPageLoadClicked: (value: boolean) => void;
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
};

const SearchablePaginatedTable: FC<Props> = ({
  onSearch,
  response,
  pageName,
  setPageLoadClicked,
  onUpdate,
  onDelete,
}) => {
  const [tableData, setTableData] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [updateId, setUpdateId] = useState('');
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const PAGE = getPageInfo(pageName);

  useEffect(() => {
    if (isUpdateClicked) {
      onUpdate(updateId, updateData);
      setIsUpdateClicked(false);
      setUpdateId('')
    }
  }, [isUpdateClicked]);

  const getUpdateInputBody = (defaultValues: any) => {
    switch (pageName) {
      case CUSTOMER_PAGE.PAGE_NAME.VALUE:
        return (
          <CustomerInputs
            isCreate={false}
            setCustomer={setUpdateData}
            defaultValues={defaultValues}
          />
        );
      case PRODUCT_PAGE.PAGE_NAME.VALUE:
        return (
          <ProductInputs
            setProduct={setUpdateData}
            defaultValues={defaultValues}
          />
        );
    }
  };

  const formatTableData = () => {
    const values = PAGE.TABLE_COLUMNS.map(({ value }) => value);
    const data =
      response.data.length > response.length
        ? response.data.slice(0, 10)
        : response.data;
    return data.map((d: any) => {
      let newObj = {};
      values.forEach(
        (key) => (newObj = Object.assign(newObj, { [key]: d[key] }))
      );
      return {
        ...newObj,
        actions: (
          <TableAction
            id={d._id}
            updateBody={getUpdateInputBody(d)}
            actions={{
              delete: {
                message: '',
                action: () => onDelete(d._id),
              },
              update: {
                isValidInput: false,
                action: () => {
                  setUpdateId(d._id);
                  setIsUpdateClicked(true);
                },
              },
            }}
          />
        ),
      };
    });
  };

  useEffect(() => {
    setTableData(formatTableData());
  }, [response.data]);

  return (
    <>
      <SearchHeader
        searchProps={{
          placeholder: PAGE.SEARCH.PLACEHOLDER,
          onSearch,
        }}
      />
      {response.data?.length > 0 ? (
        <>
          <Table columns={PAGE.TABLE_COLUMNS} data={tableData} />
          <Pagination
            pageName={pageName}
            total={response.total}
            setPageLoadClicked={setPageLoadClicked}
          />
        </>
      ) : (
        <NoTableData />
      )}
    </>
  );
};

export default SearchablePaginatedTable;
