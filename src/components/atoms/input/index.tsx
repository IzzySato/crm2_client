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
      id="default-search"
      className={`${width} p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      placeholder={placeholder}
      required={isRequired}
      onChange={(e) => onChange(e)}
    />
  );
};

export default Input;
