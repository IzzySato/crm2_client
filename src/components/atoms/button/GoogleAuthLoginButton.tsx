import { FC } from 'react';
import { FaGoogle } from 'react-icons/fa';

const GoogleAuthLoginButton: FC = () => {
  return (
    <div className="px-6 sm:px-0 max-w-sm">
      <a
        href="http://localhost:8080/auth/google"
        className="text-white w-full  bg-[#FC3838] hover:bg-[#FC3838]/90 focus:ring-4 focus:outline-none focus:ring-[#FC3838]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
      >
        <div className="text-xl">
          <FaGoogle />
        </div>
        GOOGLE LOGIN<div></div>
      </a>
    </div>
  );
};

export default GoogleAuthLoginButton;
