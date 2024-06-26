import { FC } from 'react';
import SearchInput, { SearchProps } from '../atoms/input/Search';
import Button, { ButtonProps } from '../atoms/button';

export type SearchHeaderProps = {
  buttons?: ButtonProps[];
  searchProps: SearchProps;
};

const SearchHeader: FC<SearchHeaderProps> = ({
  buttons,
  searchProps: { placeholder, onSearch },
}) => {
  return (
    <div className="px-10 pt-4">
      <div className="mb-2">
        {buttons &&
          buttons.length > 0 &&
          buttons.map((prop) => (
            <div key={prop.text}>
              <Button {...prop}/>
            </div>
          ))}
      </div>
      <SearchInput placeholder={placeholder} onSearch={onSearch} />
    </div>
  );
};

export default SearchHeader;
