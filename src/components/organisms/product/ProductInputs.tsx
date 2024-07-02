import { FC, useEffect, useState } from 'react';
import InputField from '../../molecules/inputField/InputField';
import TagInput from '../../molecules/tag/TagInput';
import FileInput from '../../atoms/input/FileInput';

type Props = {
  setProduct: (data: any) => void;
  validate: (value: boolean) => void;
  defaultValues?: {
    name: string;
    sku: string;
    categoryTags: string[];
    description: string;
  };
};

const ProductInputs: FC<Props> = ({ setProduct, validate, defaultValues }) => {
  const [productData, setProductData] = useState({
    name: defaultValues?.name || '',
    sku: defaultValues?.sku || '',
    categoryTags: defaultValues?.categoryTags || [],
    description: defaultValues?.description || '',
  });

  useEffect(() => {
    // passing to parent
    setProduct(productData);
    validate(productData.name !== '' && productData.sku !== '');
  }, [productData]);

  return (
    <>
      <div className="mb-2">
        <InputField
          error={productData.name === '' ? 'Product name is required' : ''}
          inputProps={{
            value: productData.name,
            label: 'Product Name',
            isRequired: true,
            placeholder: 'Deck board',
            onChange: ({ target: { value } }) => {
              setProductData({ ...productData, name: value });
            },
          }}
        />
      </div>
      <div className="mb-2">
        <InputField
          inputProps={{
            value: productData.sku,
            label: 'SKU',
            placeholder: 'rg-1234tyyessop',
            onChange: ({ target: { value } }) => {
              setProductData({ ...productData, sku: value });
            },
          }}
        />
      </div>
      <div>
        <InputField
          inputProps={{
            value: productData.description,
            label: 'Description',
            placeholder: 'Type the product description',
            onChange: ({ target: { value } }) => {
              setProductData({ ...productData, description: value });
            },
          }}
        />
      </div>
      <div>
        <TagInput
          title="Category Tag"
          assignedTags={productData.categoryTags}
          setParentTag={(value) =>
            setProductData({ ...productData, categoryTags: value })
          }
        />
      </div>
      <div>
        <FileInput title="Upload product image (optinal)" />
      </div>
    </>
  );
};

export default ProductInputs;
