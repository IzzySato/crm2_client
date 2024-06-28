import { FC } from 'react';
import LoadingIcon from '../loading/LoadingIcon';

export type ButtonProps = {
  loading?: boolean;
  text?: string;
  type: string;
  icon?: any;
  isDisabled?: boolean;
  testId?: string,
  onClick: () => any;
};

const Button: FC<ButtonProps> = ({
  icon,
  type,
  text,
  loading,
  onClick,
  isDisabled,
  testId = '',
}) => {
  const styles = {
    default: {
      background: 'bg-blue-700',
      hover: 'hover:bg-blue-800',
      text: 'text-white',
      focus: 'focus:outline-none',
      dark: 'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    },
    secondary: {
      background: 'bg-white',
      hover: '',
      text: 'font-semibold text-gray-900',
      focus: '',
      dark: '',
    },
    cancel: {
      background: 'bg-white border',
      hover: 'hover:bg-gray-100 hover:text-blue-700',
      text: 'text-gray-900',
      focus: 'focus:outline-none',
      dark: 'dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-800',
    },
    noStyled: {
      background: '',
      hover: '',
      text: '',
      focus: '',
      dark: '',
    },
    disabled: 'text-gray-300 hover:cursor-text',
    common: `${testId} flex font-medium rounded-lg text-sm px-3 py-2 text-center`,
  };

  const css = styles[type as keyof Object];

  return (
    <button
      onClick={isDisabled ? () => {} : onClick}
      data-modal-hide="default-modal"
      type="button"
      className={`${styles['common' as keyof Object]}
      ${
        isDisabled
          ? `${styles['disabled' as keyof Object]}`
          : `${css['text' as keyof Object]}
            ${css['background' as keyof Object]}
            ${css['hover' as keyof Object]}
            ${css['focus' as keyof Object]}
            ${css['dark' as keyof Object]}`
      }`}
    >
      {loading === true ? <LoadingIcon /> : <p>{text}</p>}
      {<div className="text-xl">{icon}</div>}
    </button>
  );
};

export default Button;
