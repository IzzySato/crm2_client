import { FC, useState } from 'react';
import TableAction from '../../../molecules/tableAction';
import ProductInputs from '../ProductInputs';

type Props = {
  data: any;
  actions: {
    update: (data: any) => void;
    delete: (data: any) => void;
  };
};

const ProductTableAction: FC<Props> = ({ actions, data }) => {
  const [isValidData, setIsVaildData] = useState(false);
  const [newUpdatedData, setUpdatedData] = useState({});
  
  return (
    <TableAction
      updateBody={
        // Edit Product
        <ProductInputs
          validate={(value: boolean) => setIsVaildData(value)}
          setProduct={(data) => {
            setUpdatedData(data);
          }}
          defaultValues={{
            name: data.name,
            sku: data.sku,
            categoryTags: data.categoryTags,
            description: data.description,
          }}
        />
      }
      id={data._id}
      actions={{
        delete: {
          message: `Delete Product Id: ${data._id}`,
          action: () => {
            actions.delete(data);
          },
        },
        update: {
          isDisabled: !isValidData,
          action: () => {
            actions.update({ originalData: data, newUpdatedData });
          },
        },
      }}
    />
  );
};

export default ProductTableAction;
