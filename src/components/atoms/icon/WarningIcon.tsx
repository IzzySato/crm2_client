import { FC } from 'react';
import { IoWarning } from 'react-icons/io5';

const WarningIcon: FC = () => {
  return (
    <div className="text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200">
      <IoWarning />
    </div>
  );
};

export default WarningIcon;
