import { FC } from 'react';
import Button from '../button';
import Input from '.';

export type SearchProps = {
  loading: boolean;
  placeholder: string;
  onSearch: () => void;
  onChange: () => void;
};

const SearchInput: FC<SearchProps> = ({
  placeholder,
  loading = false,
  onSearch,
  onChange,
}) => {
  return (
    <form>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <Input placeholder={placeholder} onChange={onChange} />
        <div className="absolute right-0 bottom-2 px-4">
          <Button text={'Search'} type={'default'} onClick={onSearch} />
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
