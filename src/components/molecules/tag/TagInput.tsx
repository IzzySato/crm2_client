import { FC, useState, useEffect } from 'react';
import Chip from '../../atoms/tag/Chip';
import Button from '../../atoms/button';
import Input from '../../atoms/input';

type TagInputProps = {
  title: string;
  placeholder?: string;
  assignedTags: string[];
  onApply: (values: string[]) => void;
};

const TagInput: FC<TagInputProps> = ({
  onApply,
  title,
  assignedTags,
  placeholder = '',
}) => {
  const [tags, setTags] = useState(['']);
  const [newTagName, setNewTagName] = useState('');

  useEffect(() => {
    setTags(assignedTags);
  }, [assignedTags]);

  return (
    <div className="flex flex-col items-center h-min bg-gray-30">
      <div className="w-full p-4 items-center bg-white rounded-2xl shadow-xl overflow-hidden sm:max-w-4xl hover:shadow-xl dark:bg-gray-500">
        <div className="mt-2">
          <div className="flex flex-col items-center mt-1 text-sm sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:mb-2">
              <label>
                <span className="ml-2 text-sm text-gray-800 sm:text-base dark:text-gray-200">
                  {title}
                </span>
                <div className="py-3">
                  <Input
                    placeholder={placeholder || 'Type tag name'}
                    value={newTagName}
                    onChange={({ target: { value } }) => setNewTagName(value)}
                  />
                </div>
              </label>
            </div>
            <div className="py-3 pt-7">
              <Button
                type="secondary"
                isDisabled={newTagName === ''}
                text="Add"
                onClick={() => {
                  setTags([...tags, newTagName]);
                  setNewTagName('');
                }}
              />
            </div>
          </div>
        </div>
        <div className="px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg bg-purple-200 dark:bg-gray-400">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <Chip
                key={`${tag}_${index}`}
                name={tag}
                onDelete={() => {
                  const filteredTags = tags.filter((t) => tag !== t);
                  setTags(filteredTags);
                }}
              />
            ))}
        </div>
        <div>
          <Button text="Apply" type="default" onClick={() => onApply(tags)} />
        </div>
      </div>
    </div>
  );
};

export default TagInput;
