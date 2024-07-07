import { FC, useEffect, useState } from 'react';
import InputField from '../../molecules/inputField/InputField';
import TagInput from '../../molecules/tag/TagInput';
import FileInput from '../../atoms/input/FileInput';
import { getUpdatedObject } from '../../../utils/update';

type Props = {
  setProduct: (data: any) => void;
  defaultValues?: {
    _id: string;
    name: string;
    sku: string;
    categoryTags: string[];
    description: string;
    imageUrl: string;
  };
};

const ProductInputs: FC<Props> = ({ setProduct, defaultValues }) => {
  const [productData, setProductData] = useState({
    name: defaultValues?.name || '',
    sku: defaultValues?.sku || '',
    categoryTags: defaultValues?.categoryTags || [],
    description: defaultValues?.description || '',
    imageUrl: defaultValues?.imageUrl || '',
  });
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    // passing to parent
    if (productData.name !== '' && productData.sku !== '') {
      const keys = ['name', 'sku', 'categoryTags', 'description'];
      const product = defaultValues
        ? getUpdatedObject(keys, defaultValues, productData)
        : productData;
      if (file) {
        product.file = file;
      }
      setProduct(product);
    }
  }, [productData, file]);

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
          error={productData.sku === '' ? 'Product sku is required' : ''}
          inputProps={{
            value: productData.sku,
            label: 'SKU',
            isRequired: true,
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
          onApply={(value) =>
            setProductData({ ...productData, categoryTags: value })
          }
        />
      </div>
      <div>
        <FileInput
          title="Upload product image (optinal)"
          onChange={({ target: { files } }) => setFile(files[0])}
        />
      </div>
    </>
  );
};

export default ProductInputs;
