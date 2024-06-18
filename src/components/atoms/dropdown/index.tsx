import { FC, useState } from 'react';
import Button from '../button';
import { IoMdArrowDropdown } from 'react-icons/io';

type Props = {
  name: string;
  data: { id: string; name: string }[];
  setSelect: (data: any) => void;
};

const DropDown: FC<Props> = ({ name, data, setSelect }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <Button
        icon={<IoMdArrowDropdown />}
        text={name}
        type='secondary'
        onClick={() => setShowOptions(!showOptions)}
      />
      <div
        className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {data && showOptions &&
            data.map(({ id, name }) => (
              <div
                className="hover:cursor-pointer hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                key={id}
                onClick={() => {
                  setSelect(name);
                  setShowOptions(false);
                }}
              >
                {name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
