import { FC, useEffect, useState } from 'react';
import { getProductById, updateProduct } from '../../api/product';
import TagInput from '../../components/molecules/tag/TagInput';
import Image from '../../components/atoms/image';
import Navbar, { PAGE_NAME } from '../../components/organisms/Navbar';
import { useParams } from 'react-router-dom';
import Toast from '../../components/atoms/toast';

const ProductDetail: FC = () => {
  const { id = '' } = useParams();
  const [productData, setProductData] = useState({
    name: '',
    sku: '',
    imageUrl: '',
    categoryTags: [],
    description: '',
  });
  const [tags, setTags] = useState<any>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getProductById(id);
      setTags(data.categoryTags);
      setProductData(data);
    })();
  }, [id]);

  const updateCategoryTag = async (value: string[]) => {
    await updateProduct(id, { categoryTags: value });
    setShowToast(true);
    setToastMessage('Successfully updated category tags');
  };

  return (
    <>
      <Navbar current={PAGE_NAME.PRODUCT}/>
      <Toast
        status="success"
        isDisplay={showToast}
        message={toastMessage}
        setDisplay={setShowToast}
      />
      <div className="pt-5 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              {productData.imageUrl !== '' && (
                <div className="h-[460px] rounded-lg dark:bg-gray-700 mb-4">
                  <Image
                    className="w-full h-full object-cover"
                    src={productData.imageUrl}
                    alt="product image"
                  />
                </div>
              )}
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {productData.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {productData.description}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    SKU:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 pl-2">
                    {productData.sku}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <TagInput
                  title="Category Tags"
                  assignedTags={tags}
                  onApply={async (value) => await updateCategoryTag(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
