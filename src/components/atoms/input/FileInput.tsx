import { FC } from 'react';

type FileInputProp = {
  title: string
  onChange: (e: any) => void;
};

const FileInput: FC<FileInputProp> = ({ title, onChange }) => {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={(e) => onChange(e)}
      />
    </>
  );
};

export default FileInput;
