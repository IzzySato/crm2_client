import { FC, useState } from 'react';
import DeleteIcon from '../../atoms/icon/DeleteIcon';
import EditIcon from '../../atoms/icon/EditIcon';
import ConfirmModal from '../modal';
import { updateCustomer } from '../../../api/customer';

type Props = {
  id: string;
};

const TableAction: FC<Props> = ({ id }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const deleteCustomer = async () => {
    const today = new Date();
    await updateCustomer(id, { deletedAt: today });
  };

  return (
    <>
      <div className="flex">
        <div
          onClick={() => setOpenConfirmModal(true)}
          className="text-lg pr-4 hover:cursor-pointer"
        >
          <DeleteIcon />
        </div>
        <div className="text-lg">
          <EditIcon />
        </div>
      </div>

      {/* Delete confirm modal */}
      <ConfirmModal
        title="Confirm"
        isDisplay={openConfirmModal}
        body={
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Are you sure?
          </p>
        }
        onClose={() => setOpenConfirmModal(false)}
        onYes={{ name: 'Yes', action: async () => await deleteCustomer()}}
        onNo={{ name: 'Cancel', action: () => setOpenConfirmModal(false)}}
      />
    </>
  );
};

export default TableAction;
