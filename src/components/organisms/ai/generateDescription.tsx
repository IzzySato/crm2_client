import { FC } from 'react';
import { getImageDescription } from '../../../api/ai';
import Button, { ButtonType } from '../../atoms/button';
import { uploadImage } from '../../../api/upload';

type Props = {
  file: any;
  setParentInputs: (image_url: string, description: string) => void;
  productName: string;
};

const GenerateDescription: FC<Props> = ({ file, setParentInputs, productName }) => {
  const onGenerateDescription = async () => {
    const image_url = await uploadImage(file);
    const {
      data: { description },
    } = await getImageDescription({ image_url, product_name: productName });
    setParentInputs(image_url, description[0]?.generated_text);
  };

  return (
    <div className="flex flex-col items-center rounded-[1rem] bg-gray-200 p-4">
      <h2 className="text-xl font-semibold text-stone-600 mb-4">
        AI-Powered Image to Text Description Generator
      </h2>
      <p className="text-lg mb-4 text-stone-600">
        Do you want to generate a description from the image?
      </p>
      <div className="flex space-x-4">
        <Button
          onClick={onGenerateDescription}
          text="Generate Description"
          type={ButtonType.Default}
        />
      </div>
    </div>
  );
};

export default GenerateDescription;
