import { FC } from 'react';
import GoogleAuthLoginButton from '../../components/atoms/button/GoogleAuthLoginButton';
import Image from '../../components/atoms/image';

const Login: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className='absolute top-10'>
        <h1 className='text-4xl uppercase'>Welcome to Our CRM Platform</h1>
        <p className='mt-3 text-lg text-center'>To continue, please log in with your Google account</p>
      </div>

      <Image src="https://go-trade-local-product-123.s3.us-east-2.amazonaws.com/laptop.jpg" alt="crm tech image" className="w-1/2"/>
      <div className='absolute bg-slate-50 p-5 rounded-lg'>
        <GoogleAuthLoginButton />
      </div>
    </div>
  );
};

export default Login;
