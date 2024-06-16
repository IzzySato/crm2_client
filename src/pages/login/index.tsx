import { FC, useEffect, useState } from 'react';
import GoogleAuthLoginButton from '../../components/atoms/button/GoogleAuthLoginButton';
import TradeLocalLoginButton from '../../components/atoms/button/TradeLocalLoginButton';

const Login: FC = () => {
  // const [isReady, setIsReady] = useState(false)

  // useEffect(() => {
  //   ;(async () => {
  //   })();
  // }, []);

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
