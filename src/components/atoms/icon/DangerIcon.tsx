import { FC } from 'react';
import { CgDanger } from 'react-icons/cg';

const DangerIcon: FC = () => {
  return (
    <div className="text-red-500 dark:bg-red-800 dark:text-red-200">
      <CgDanger />
    </div>
  );
};

export default DangerIcon;
