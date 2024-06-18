import { FC } from 'react';
import LoadingIcon from '../loading/LoadingIcon';

export type ButtonProps = {
  loading?: boolean;
  text: string;
  type: string;
  icon?: any;
  onClick: () => any;
};

const Button: FC<ButtonProps> = ({ icon, type, text, loading, onClick }) => {
  const busstonTypes = {
    default: {
      background: 'bg-blue-700',
      hover: 'hover:bg-blue-800',
      text: 'text-white',
      focus: 'focus:ring-blue-300 focus:ring-4 focus:outline-none',
      dark: 'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    },
    secondary: {
      background: 'bg-white',
      hover: 'hover:bg-gray-50',
      text: 'font-semibold text-gray-900',
      focus: '',
      dark: '',
    },
    cancel: {
      background: 'bg-white border',
      hover: 'hover:bg-gray-100 hover:text-blue-700',
      text: 'text-gray-900',
      focus: 'focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-100',
      dark: 'dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-800',
    },
  };

  const css = busstonTypes[type as keyof Object];

  return (
    <button
      onClick={onClick}
      data-modal-hide="default-modal"
      type="button"
      className={`${css['text' as keyof Object]} ${
        css['background' as keyof Object]
      } ${css['hover' as keyof Object]} ${
        css['focus' as keyof Object]
      } font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
        css['dark' as keyof Object]
      } flex`}
    >
      {loading === true ? <LoadingIcon /> : text }
      {<div className='text-xl'>{icon}</div>}
    </button>
  );
};

export default Button;
