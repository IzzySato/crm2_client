import { FC } from 'react';
import SearchInput, { SearchProps } from '../atoms/input/Search';

export type SearchHeaderProps = {
  searchProps: SearchProps;
};

const SearchHeader: FC<SearchHeaderProps> = ({
  searchProps: { placeholder, onSearch },
}) => {
  return (
    <div className="page-px mt-4">
      <SearchInput placeholder={placeholder} onSearch={onSearch} />
    </div>
  );
};

export default SearchHeader;
