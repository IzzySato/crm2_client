import { FC, useEffect, useState } from 'react';

type CheckboxFieldProps = {
  loading: boolean
}

const CheckboxField: FC<CheckboxFieldProps> = ({ loading }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
  }, []);

  return <div>test</div>;
};

export default CheckboxField;