import { FC } from 'react';

export type InputProps = {
  width?: string;
  label?: string;
  placeholder: string;
  value?: string;
  isRequired?: boolean;
  onChange: (e: any) => void;
};

const Input: FC<InputProps> = ({
  width = 'w-full',
  placeholder,
  value = '',
  isRequired = false,
  onChange,
}) => {
  return (
    <input
      type="search"
      value={value}
      className={`${width} w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
      placeholder={placeholder}
      required={isRequired}
      onChange={(e) => onChange(e)}
    />
  );
};

export default Input;
