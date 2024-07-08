import { FC } from 'react';
import GoogleAuthLoginButton from '../../components/atoms/button/GoogleAuthLoginButton';

const Login: FC = () => {
  return (
    <div className="mt-9 flex justify-center items-center">
      <GoogleAuthLoginButton />
    </div>
  );
};

export default Login;
