import { FC } from 'react';
import LoadingIcon from '../loading/LoadingIcon';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Default = 'default',
  Cancel = 'cancel',
  Success = 'success',
  Disabled = 'disabled',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark',
}

export type ButtonProps = {
  loading?: boolean;
  text?: string;
  type?: ButtonType;
  icon?: any;
  isDisabled?: boolean;
  testClass?: string;
  customClass?: string;
  onClick: () => any;
};

const Button: FC<ButtonProps> = ({
  icon,
  type,
  text,
  loading = false,
  onClick,
  isDisabled,
  customClass,
  testClass = '',
}) => {
  const styles = {
    default:
      'font-medium rounded-lg text-center bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700',
    secondary:
      'font-medium rounded-lg text-center bg-white font-semibold text-gray-900',
    cancel:
      'font-medium rounded-lg text-center bg-white text-gray-900 border hover:bg-gray-100 hover:text-blue-700 dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-800',
    disabled:
      'font-medium rounded-lg text-center text-gray-300 hover:cursor-text',
    common: `${testClass} flex focus:outline-none px-3 py-2 text-sm`,
  };

  const getClasses = () => {
    let classes = styles.common;
    if (type) {
      classes += ` ${styles[type.toString() as keyof Object]}`;
    }
    if (customClass) {
      classes += ` ${customClass}`;
    }
    return classes;
  };

  return (
    <button
      onClick={isDisabled ? () => {} : onClick}
      type="button"
      className={getClasses()}
    >
      {loading === true ? <LoadingIcon /> : <p>{text}</p>}
      {<div className="text-xl pl-3">{icon}</div>}
    </button>
  );
};

export default Button;
