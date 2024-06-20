import { FC, useEffect } from 'react';
import DangerIcon from '../icon/DangerIcon';
import WarningIcon from '../icon/WarningIcon';
import CheckIcon from '../icon/CheckIcon';
import CloseButton from '../button/CloseButton';

type Props = {
  status: string;
  isDisplay: boolean;
  message: string;
  setDisplay: (data: boolean) => void;
};

const Toast: FC<Props> = ({ status, isDisplay, message, setDisplay }) => {
  const getInfo = () => {
    switch (status) {
      case 'success':
        return <CheckIcon />;
      case 'danger':
        return <DangerIcon />;
      case 'warning':
        return <WarningIcon />;
    }
  };

  useEffect(() => {
    if (isDisplay) {
      setTimeout(() => {
        setDisplay(false);
      }, 2000);
    }
  }, [isDisplay]);

  return (
    <>
      {isDisplay && (
        <div
          className="flex items-center w-full max-w-xs p-1 mb-4 text-gray-500 bg-white rounded-lg shadow"
        >
          <div className="text-2xl inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
            {getInfo()}
          </div>
          <div className="ms-3 text-sm font-normal">{message}</div>
          <CloseButton onClose={() => setDisplay(false)} />
        </div>
      )}
    </>
  );
};

export default Toast;
