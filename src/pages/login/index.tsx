import { FC } from 'react';
import GoogleAuthLoginButton from '../../components/atoms/button/GoogleAuthLoginButton';
import Image from '../../components/atoms/image';

const Login: FC = () => {
  return (
    <div className="text-center">
      <div className="p-5">
        <h1 className="text-4xl uppercase">Welcome to Our CRM Platform</h1>
        <p className="mt-3 text-lg">
          To continue, please log in with your Google account
        </p>
      </div>
      <div className="relative">
        <div className="absolute bg-slate-50 p-5 rounded-lg top-4 left-0 right-0 flex justify-center items-center">
          <GoogleAuthLoginButton />
        </div>
        <Image
          src="https://go-trade-local-product-123.s3.us-east-2.amazonaws.com/laptop.jpg"
          alt="crm tech image"
          className="lg:w-1/2 sm:w-full m-auto"
        />
      </div>
    </div>
  );
};

export default Login;
