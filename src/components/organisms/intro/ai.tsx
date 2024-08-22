import { FC } from 'react';
import Image from '../../atoms/image';

const AiIntro: FC = () => {
  const features = [
    {
      id: 'AI_Integration',
      label: 'AI Integration:',
      text: 'Utilizes the state-of-the-art image-to-text models from HuggingFace, ensuring high-quality descriptions.',
    },
    {
      id: 'Seamless_API_Design',
      label: 'Seamless API Design:',
      text: 'Built as a microservice, it can be easily integrated into larger applications, allowing for flexible and scalable AI-powered functionality.',
    },
    {
      id: 'Secure_and_Efficient',
      label: 'Secure and Efficient:',
      text: 'Designed with security in mind, the service handles user authentication and processes requests efficiently, making it suitable for real-time applications.',
    },
    {
      id: 'Scalable_Deployment',
      label: 'Scalable Deployment:',
      text: 'Deployed on a Flask framework, ensuring that the service is lightweight and can be scaled according to demand.',
    },
  ];

  return (
    <div className="my-10">
      <h2 className="mb-5 text-3xl">AI-Powered Image-to-Text Generation</h2>
      <h2 className="mb-3 text-xl font-bold">Overview</h2>
      <p className="text-lg mb-5">
        In this project, I developed a Python Flask microservice designed to
        handle AI functions, specifically for generating descriptive text from
        images. Leveraging the powerful HuggingFace API, this service processes
        images to create detailed and accurate descriptions.
      </p>
      <Image
        src="https://go-trade-local-product-123.s3.us-east-2.amazonaws.com/ai.png"
        alt="ai generate product description"
        className=""
      />
      <h3 className="my-3 text-xl font-bold">Key features</h3>
      <ul>
        {features.map(({ id, label, text }) => (
          <li key={id} className="mb-4">
            <strong className="mr-3">{label}</strong>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AiIntro;
