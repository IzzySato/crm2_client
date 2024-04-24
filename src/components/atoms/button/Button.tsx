import { FC, useEffect, useState } from 'react';

type ButtonProps = {
  loading: boolean
}

const Button: FC<ButtonProps> = ({ loading }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
  }, []);

  return <div>test</div>;
};

export default Button;
