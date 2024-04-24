import { FC, useEffect, useState } from 'react';

type InputProps = {
  loading: boolean
}

const Input: FC<InputProps> = ({ loading }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
  }, []);

  return <div>test</div>;
};

export default Input;