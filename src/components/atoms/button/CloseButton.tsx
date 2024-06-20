import { FC } from 'react';
import CloseIcon from '../icon/CloseIcon';

type ButtonProps = {
  onClose: () => void;
};

const CloseButton: FC<ButtonProps> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      type="button"
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
      data-modal-hide="default-modal"
    >
      <div className="text-xl">
        <CloseIcon />
      </div>
      <span className="sr-only">Close modal</span>
    </button>
  );
};

export default CloseButton;
