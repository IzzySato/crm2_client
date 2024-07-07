import { FC } from 'react';
import CloseButton from '../../atoms/button/CloseButton';
import Button, { ButtonType } from '../../atoms/button';

type Props = {
  title: string;
  isDisplay: boolean;
  testClass?: string;
  body: any;
  onClose: () => void;
  onYes: {
    name: string
    isDisabled?: boolean,
    action: () => void
  };
  onNo: {
    name: string,
    action: () => void
  };
};

const GeneralModal: FC<Props> = ({
  isDisplay,
  testClass = '',
  title,
  body,
  onClose,
  onYes,
  onNo,
}) => {
  return (
    <>
      {isDisplay && (
        <div
          id="default-modal"
          aria-hidden="true"
          className={`${testClass} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-stone-100`}
        >
          <div className="mx-auto relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <CloseButton onClose={onClose} />
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                {body}
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button
                  loading={false}
                  isDisabled={onYes.isDisabled}
                  text={onYes.name}
                  type={ButtonType.Default}
                  onClick={onYes.action}
                />
                <div className="ml-3">
                  <Button
                    loading={false}
                    text={onNo.name || 'Cancel'}
                    type={ButtonType.Cancel}
                    onClick={onNo.action}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralModal;
