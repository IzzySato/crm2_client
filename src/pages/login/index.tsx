import { FC } from 'react';
import GoogleAuthLoginButton from '../../components/atoms/button/GoogleAuthLoginButton';
import TradeLocalLoginButton from '../../components/atoms/button/TradeLocalLoginButton';

const Login: FC = () => {
  return (
    <div className="mt-9 flex justify-center items-center">
      <div>
        <TradeLocalLoginButton />
        <GoogleAuthLoginButton />
      </div>
    </div>
  );
};

export default Login;
