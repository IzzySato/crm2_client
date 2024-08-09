import { FC } from 'react';
import Image from '../../components/atoms/image';
import { Link } from 'react-router-dom';
import CustomerPageIntro from '../../components/organisms/intro/customerPgae';
import ProductPageIntro from '../../components/organisms/intro/productPage';

const techList = [
  {
    id: 'backend',
    label: 'Backend:',
    value: 'Node.js, MongoDB, Redis',
  },
  {
    id: 'frontend',
    label: 'Frontend:',
    value: 'React, TypeScript, Tailwind CSS',
  },
  {
    id: 'cloudStorage',
    label: 'Cloud & Storage:',
    value: 'AWS S3',
  },
  {
    id: 'authentication',
    label: 'Authentication:',
    value: 'JWT, Passport for OAuth',
  },
  {
    id: 'continuousIntegration',
    label: 'Continuous Integration:',
    value: 'CircleCI',
  },
  {
    id: 'testing',
    label: 'Testing:',
    value: 'Jest (Backend and Frontend), Puppeteer (Frontend)',
  },
];

const features = [
  {
    id: 'authentication',
    label: 'Secure Authentication:',
    value: 'Implemented robust authentication processes to protect user data.',
  },
  {
    id: 'ci',
    label: 'Continuous Integration:',
    value:
      'Leveraged CircleCI for seamless and automated deployment, enhancing development workflow and ensuring consistent delivery.',
  },
  {
    id: 's3',
    label: 'Image Storage:',
    value:
      'Utilized AWS S3 for efficient and secure storage of images, improving accessibility and performance.',
  },
  {
    id: 'testing',
    label: 'Comprehensive Testing:',
    value:
      'Ensured the reliability and functionality of both backend and frontend through rigorous testing with Jest and end-to-end testing with Puppeteer.',
  },
];

const IntroPage: FC = () => {
  return (
    <div className="px-5 sm:px-5 md:px-10 lg:px-56 mt-10">
      <h1 className="mb-10 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
        Izzy&#39;s Customer Relationship Management (CRM) System Portfolio
      </h1>
      <Image
        src="https://go-trade-local-product-123.s3.us-east-2.amazonaws.com/tech_top.jpg"
        alt="tech"
        className="p-5 xlg:w-4/6 mx-auto"
      />
      <div className="mb-10">
        <h2 className="mb-5 text-3xl">Introduction</h2>
        <p className='text-lg'>
          Welcome to my portfolio page! Here, you&#39;ll find an in-depth look at
          the Customer Relationship Management (CRM) system I developed,
          showcasing my skills and experience in full-stack development. This
          CRM system was built to streamline customer and product information
          management, incorporating modern technologies and best practices to
          ensure reliability, security, and efficiency.
        </p>
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="mb-5 text-3xl">Technologies:</h2>
          <ul>
            {techList.map(({ id, label, value }) => (
              <li key={id} className='mb-3'>              <p>
              <strong className="mr-3">{label}</strong>
              {value}
            </p></li>
            ))}
          </ul>
        </div>
        <Image
          src="https://go-trade-local-product-123.s3.us-east-2.amazonaws.com/laptop.jpg"
          alt="tech image"
          className="w-96"
        />
      </div>
      <h2 className="mb-5 text-3xl">Project Description</h2>
      <p className='text-lg'>
        I developed a comprehensive Customer Relationship Management (CRM)
        system utilizing Node.js and MongoDB to store and manage customer
        information and products efficiently. The system features secure
        authentication mechanisms using JWT and Passport for OAuth to ensure
        data privacy and security.
      </p>
      <div>
        <h2 className="mt-10 mb-5 text-3xl">Key Features</h2>
        <ul>
          {features.map(({ id, label, value }) => (
            <li key={id} className="mb-3">
              <p>
                <strong className="mr-3">{label}</strong>
                {value}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <CustomerPageIntro />
      </div>
      <div>
        <ProductPageIntro />
      </div>
      <div className="mt-10 mb-10">
        <h2 className="mb-5 text-3xl">GitHub Repositories:</h2>
        <ul>
          <li className='text-blue-500 mb-5'>
            <Link to="https://github.com/IzzySato/crm2_server">Backend</Link>
          </li>
          <li className='text-blue-500'>
            <Link to="https://github.com/IzzySato/crm2_client">Frontend</Link>
          </li>
        </ul>
      </div>
      <div className='mb-10'>
        <h2 className="mb-5 text-3xl">Welcome to Our CRM Platform</h2>
        <p className='text-lg'>Click the button below to log in and explore our Customer Relationship Management (CRM) system. Dive into the features and functionalities that streamline customer and product information management, offering a seamless and efficient experience.</p>
        <div className='mt-4 text-blue-500'>
          <Link to="/login" >Login Page</Link>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
