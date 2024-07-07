import { FC, useState } from 'react';
import Button from '../button';
import Input from '.';
import SearchIcon from '../icon/SearchIcon';

export type SearchProps = {
  placeholder: string;
  onSearch: (value: string) => void;
};

const SearchInput: FC<SearchProps> = ({ placeholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="relative max-w-sm mx-auto mt-1">
      <Input
        placeholder={placeholder}
        onChange={({ target: { value } }) => setSearchValue(value)}
        value={searchValue}
      />
      <Button
        icon={<SearchIcon />}
        customClass="absolute inset-y-0 right-0 items-center text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200"
        onClick={() => onSearch(searchValue)}
      />
    </div>
  );
};

export default SearchInput;
