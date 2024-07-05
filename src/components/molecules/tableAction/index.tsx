import { FC, useState } from 'react';
import DeleteIcon from '../../atoms/icon/DeleteIcon';
import EditIcon from '../../atoms/icon/EditIcon';
import Modal from '../modal';

type Props = {
  updateBody: any;
  id: string;
  actions: {
    delete: {
      message: string;
      action: () => void;
    };
    update: {
      isValidInput: boolean;
      action: () => void;
    };
  };
};

const TableAction: FC<Props> = ({ updateBody, actions, id }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  return (
    <>
      <div className="flex">
        <div
          onClick={() => setOpenConfirmModal(true)}
          className="text-lg pr-4 hover:cursor-pointer"
        >
          <DeleteIcon />
        </div>
        <div
          onClick={() => setOpenUpdateModal(true)}
          className="text-lg hover:cursor-pointer"
        >
          <EditIcon />
        </div>
      </div>

      {/* Delete confirm modal */}
      <Modal
        title="Confirm"
        isDisplay={openConfirmModal}
        body={
          <>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure?
            </p>
            <p>{actions.delete.message}</p>
          </>
        }
        onClose={() => setOpenConfirmModal(false)}
        onYes={{
          name: 'Delete',
          action: () => {
            actions.delete.action();
            setOpenConfirmModal(false);
          },
        }}
        onNo={{ name: 'Cancel', action: () => setOpenConfirmModal(false) }}
      />

      {/* Update modal */}
      <Modal
        title="Update"
        isDisplay={openUpdateModal}
        body={updateBody}
        onClose={() => setOpenUpdateModal(false)}
        onYes={{
          name: 'Update',
          isDisabled: actions.update.isValidInput,
          action: () => {
            actions.update.action();
            setOpenUpdateModal(false);
          },
        }}
        onNo={{ name: 'Cancel', action: () => setOpenUpdateModal(false) }}
      />
    </>
  );
};

export default TableAction;
