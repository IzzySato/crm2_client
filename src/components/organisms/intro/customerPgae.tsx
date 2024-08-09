import { FC } from 'react';
import Image from '../../atoms/image';

const CustomerPageIntro: FC = () => {
  const features = [
    {
      id: 'Data Retrieval',
      label: 'Data Retrieval:',
      list: [
        {
          id: 'getCustomer',
          value:
            'The customer data is fetched using the endpoint GET /customer with the following parameters:',
          subList: [
            {
              label: 'pageNum:',
              value: 'Specifies the current page number.',
            },
            {
              label: 'length:',
              value: 'Defines the number of records per page.',
            },
            {
              label: 'fields:',
              value: 'Specifies the fields to be retrieved.',
            },
          ],
        },
        {
          id: 'redis',
          value:
            'The data is retrieved from a Redis cache if the same parameters have been used in a previous request, ensuring quick response times and reduced load on the database.',
        },
        {
          id: 'mongo',
          value:
            'If the data is not available in the cache, it is fetched from MongoDB using a query and then stored in the Redis cache for future requests.',
        },
      ],
    },
    {
      id: 'CreateCustomer',
      label: 'Create Customer:',
      list: [
        {
          id: 'formCreate',
          value: "A 'Create' button opens a form to add new customer details.",
        },
        {
          id: 'submitCreate',
          value: 'Submitting the form stores the new customer in MongoDB.',
        },
      ],
    },
    {
      id: 'EditCustomer',
      label: 'Edit Customer:',
      list: [
        {
          id: 'formEdit',
          value: "'Edit' button opens a form with existing customer details.",
        },
        {
          id: 'submitUpdate',
          value: 'Submitting updates the customer information in MongoDB.',
        },
      ],
    },
    {
      id: 'DeleteCustomer',
      label: 'Delete Customer:',
      list: [
        {
          id: 'delete',
          value:
            "'Delete' button updates the deleted_at field with the current date, marking the customer as deleted without removing it from the database.",
        },
      ],
    },
    {
      id: 'Pagination',
      label: 'Pagination:',
      list: [
        {
          id: 'nextPrevuous',
          value:
            "Pagination controls with 'Next' and 'Previous' buttons to navigate pages.",
        },
        {
          id: 'nextRecord',
          value:
            "Clicking 'Next' increments pageNum and fetches the next set of records.",
        },
      ],
    },
  ];

  return (
    <div className="my-10">
      <h1 className="mb-5 text-3xl">Cusomer page</h1>
      <h2 className="mb-3 text-xl font-bold">Overview</h2>
      <p className="text-lg mb-5">
        The Customer Table page allows users to view, create, edit, and delete
        customer records efficiently. It integrates caching and database
        operations for performance and data consistency.
      </p>
      <Image
        src="https://go-trade-local-product-123.s3.us-east-2.amazonaws.com/customer_table.png"
        alt="customer table image"
        className=""
      />
      <h3 className="my-3 text-xl font-bold">Key features</h3>
      <ul>
        {features.map(({ id, label, list }) => (
          <li key={id} className="mb-4">
            <strong className="mr-3">{label}</strong>
            {list.map(({ id, value, subList }) => (
              <div>
                <p key={id}>{value}</p>
                {subList ? (
                  <ul className='mt-1'>
                    {subList.map(({ label, value }) => (
                      <li key={label}>
                        <p>
                          <span className="mr-3">{label}</span>
                          {value}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerPageIntro;
