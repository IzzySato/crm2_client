import { FC } from 'react';
import CloseCircleIcon from '../icon/close/CloseCircle';
import Button from '../button';

type ChipProps = {
  name: string;
  onDelete?: () => void;
  readonly?: boolean;
};

const Chip: FC<ChipProps> = ({
  name,
  onDelete = () => {},
  readonly = false,
}) => {
  return (
    <span>
      {readonly ? (
        <span className="px-4 py-1 m-1 items-center text-sm font-medium rounded-xl text-gray-200 dark:bg-gray-700 dark:text-gray-200">
          {name}
        </span>
      ) : (
        <span className="flex flex-wrap pl-4 pr-2 py-1 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer text-gray-200 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100">
          {name}
          <Button
            icon={<CloseCircleIcon />}
            onClick={onDelete}
          />
        </span>
      )}
    </span>
  );
};

export default Chip;
