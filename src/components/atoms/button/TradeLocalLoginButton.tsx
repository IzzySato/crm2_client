import { FC } from 'react';

const TradeLocalLoginButton: FC = () => {

  return (
    <div className="px-6 sm:px-0 max-w-sm">
      <a
        href="http://localhost:8080/auth/google"
        className=" text-white w-full  bg-[#383bfc] hover:bg-[#383bfc]/90 focus:ring-4 focus:outline-none focus:ring-[#383bfc]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
      >
        <div></div>
        TRADE LOCAL LOGIN
        <div></div>
      </a>
    </div>
  );
};

export default TradeLocalLoginButton;
