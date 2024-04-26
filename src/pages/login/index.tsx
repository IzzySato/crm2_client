import { FC, useEffect, useState } from 'react';
import GoogleAuth from '../../components/organisms/GoogleAuth';

const Login: FC = () => {
  // const [isReady, setIsReady] = useState(false)

  // useEffect(() => {
  //   ;(async () => {
  //   })();
  // }, []);

  return <div>
    <h1>Login</h1>
    <GoogleAuth />
  </div>;
};

export default Login;