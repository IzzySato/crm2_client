import { FC, useState } from 'react';
import Button from '../button';
import Input from '.';
import SearchIcon from '../icon/SearchIcon';

export type SearchProps = {
  placeholder: string;
  onSearch: (value: string) => void;
};

const SearchInput: FC<SearchProps> = ({
  placeholder,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <form>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
          <div className="text-white text-2lx">
            <SearchIcon />
          </div>
        </div>
        <Input placeholder={placeholder} onChange={({ target: {value}}) => setSearchValue(value)} value={searchValue}/>
        <div className="absolute right-0 bottom-2 px-4">
          <Button
            text={'Search'}
            type={'default'}
            onClick={() => onSearch(searchValue)}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
