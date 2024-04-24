import { FC, useEffect, useState } from 'react';

type InputFieldProps = {
  loading: boolean
}

const InputField: FC<InputFieldProps> = ({ loading }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
  }, []);

  return <div>test</div>;
};

export default InputField;