import { FC, useEffect, useState } from 'react';
import { getAddress } from '../../api/address';

const Index: FC = () => {
  // const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    ;(async () => {
     const { data } = await getAddress();
     console.log('address', data);
    })();
  }, []);

  return <div>test</div>;
};

export default Index;
