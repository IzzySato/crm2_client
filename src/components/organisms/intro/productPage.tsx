import { FC } from 'react';
import Image from '../../atoms/image';

const ProductPageIntro: FC = () => {
  const features = [
    {
      id: 'Data Retrieval',
      label: 'Data Retrieval:',
      list: [
        {
          id: 'getProduct',
          value:
            'Fetch product data via GET /product with parameters: pageNum, length, fields, sortBy, and searchBy.',
        },
        {
          id: 'display',
          value: 'Data is displayed in a paginated table format.',
        },
      ],
    },
    {
      id: 'CreateProduct',
      label: 'Create Produc',
      list: [
        {
          id: 'formCreate',
          value:
            "'Create' button opens a modal form for entering new product details.",
        },
        {
          id: 'submitCreate',
          value:
            'Submitting the form stores the new product in the database and uploads the product image to AWS S3.',
        },
      ],
    },
    {
      id: 'EditProduct',
      label: 'Edit Product:',
      list: [
        {
          id: 'formEditProduct',
          value:
            "'Edit' button opens a form pre-filled with existing product details.",
        },
        {
          id: 'submitUpdateProduct',
          value:
            'Submitting the form updates the product information in the database.',
        },
      ],
    },
    {
      id: 'DeleteProduct',
      label: 'Delete Customer:',
      list: [
        {
          id: 'delete',
          value:
            "'Delete' button performs a soft delete by updating the deleted_at field with the current date, marking the product as deleted without removing it from the database.",
        },
      ],
    },
    {
      id: 'imageStorage',
      label: 'Product Image Storage:',
      list: [
        {
          id: 'image',
          value:
            'Product images are securely stored in AWS S3, ensuring efficient retrieval and management.',
        },
      ],
    },
    {
      id: 'SearchFunctionality',
      label: 'Search Functionality:',
      list: [
        {
          id: 'search',
          value:
            'A search input field allows users to filter products by specific criteria using the searchBy parameter.',
        },
        {
          id: 'searchResults',
          value:
            'The search results are dynamically fetched and displayed based on the input data.',
        },
      ],
    },
    {
      id: 'ProductDetailNavigation',
      label: 'Product Detail Navigation:',
      list: [
        {
          id: 'detail',
          value:
            'Clicking on a product ID cell navigates the user to the product detail page.',
        },
        {
          id: 'fetchS3',
          value:
            'The product detail page displays the product image fetched from AWS S3 and detailed product information.',
        },
      ],
    },
  ];

  return (
    <div className="my-10">
      <h1 className="mb-5 text-3xl">Product page</h1>
      <h2 className="mb-3 text-xl font-bold">Overview</h2>
      <p className="text-lg mb-5">
        The Product Page is a comprehensive interface designed for efficient
        product management, allowing users to view, create, edit, delete, and
        search for products. Product data is retrieved and displayed in a
        paginated table, supporting various parameters for customized views.
        Users can add new products through a modal form, which also handles
        image uploads to AWS S3, and update existing products with ease. The
        page implements soft deletion by marking products as deleted, ensuring
        data integrity. A search input field provides dynamic filtering based on
        specific criteria, enhancing the user&#39;s ability to locate desired
        products quickly. Additionally, clicking on a product ID navigates the
        user to a detailed view, displaying the product image from AWS S3 and
        detailed product information, creating a seamless and user-friendly
        experience.
      </p>
      <Image
        src="https://go-trade-local-product-123.s3.us-east-2.amazonaws.com/product_table.png"
        alt="product table image"
        className=""
      />
      <h3 className="my-3 text-xl font-bold">Key features</h3>
      <ul>
        {features.map(({ id, label, list }) => (
          <li key={id} className="mb-4">
            <strong className="mr-3">{label}</strong>
            {list.map(({ id, value }) => (
              <p key={id}>{value}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPageIntro;
