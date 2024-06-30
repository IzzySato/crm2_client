import { FC, useEffect, useState } from 'react';
import Table from '../atoms/table';
import Pagination from '../atoms/pagination/pagination';
import SearchHeader from './SearchHeader';
import { getPageInfo } from '../../utils/pageHelper';
import { ButtonProps } from '../atoms/button/index'

type HeaderAction = {
  name: string;
  onClick: () => void;
};

type Props = {
  onSearch: (value: string) => void;
  response: any;
  actions: HeaderAction[];
  pageName: string;
  setPageLoadClicked: (value: boolean) => void;
};

const SearchablePaginatedTable: FC<Props> = ({
  onSearch,
  response,
  actions,
  pageName,
  setPageLoadClicked,
}) => {
  const [tableData, setTableData] = useState([]);
  const [buttons, setButtons] = useState<ButtonProps[]>([]);
  const PAGE = getPageInfo(pageName);

  useEffect(() => {
    const values = PAGE.TABLE_COLUMNS.map(({ value }) => value);
    const newData = response.data.map((d: any) => {
      let newObj = {};
      values.forEach(
        (key) => (newObj = Object.assign(newObj, { [key]: d[key] }))
      );
      return newObj;
    });
    setTableData(newData);
    const buttonActions = actions.map(({ name, onClick }) => {
      return {
        loading: false,
        testClass:
          PAGE.ACTIONS[name as keyof Object]['TEST_CLASS' as keyof Object].toString(),
        text: PAGE.ACTIONS[name as keyof Object]['TEXT' as keyof Object].toString(),
        type: 'default',
        onClick,
      };
    });
    setButtons(buttonActions);
  }, [response.data]);

  return (
    <>
      <SearchHeader
        buttons={buttons}
        searchProps={{
          placeholder: PAGE.SEARCH.PLACEHOLDER,
          onSearch,
        }}
      />
      {response.data && <Table columns={PAGE.TABLE_COLUMNS} data={tableData} />}
      <Pagination
        pageName={pageName}
        total={response.total}
        setPageLoadClicked={setPageLoadClicked}
      />
    </>
  );
};

export default SearchablePaginatedTable;
