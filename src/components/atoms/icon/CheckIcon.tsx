import { FC } from 'react';
import { FaCheckCircle } from "react-icons/fa";

const CheckIcon: FC = () => {
  return (
    <div className="text-green-500 bg-green-100  dark:bg-green-800 dark:text-green-200">
      <FaCheckCircle />
    </div>
  );
};

export default CheckIcon;
