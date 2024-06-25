import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const MobileCloseIcon: FC = () => {
  return (
    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
  );
};

export default MobileCloseIcon;