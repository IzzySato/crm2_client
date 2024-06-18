import { FC, useEffect, useState } from 'react';
import Input from '../../atoms/input';
import DropDown from '../../atoms/dropdown';

type InputFieldProps = {
  setAddress: (data: any) => void;
};

const AddressInputs: FC<InputFieldProps> = ({ setAddress }) => {
  const provinces = [
    {
      id: 'on',
      name: 'ON',
    },
    {
      id: 'qc',
      name: 'QC',
    },
    {
      id: 'ns',
      name: 'NS',
    },
    {
      id: 'nb',
      name: 'NB',
    },
    {
      id: 'mb',
      name: 'MB',
    },
    {
      id: 'bc',
      name: 'BC',
    },
    {
      id: 'pe',
      name: 'PE',
    },
    {
      id: 'sk',
      name: 'SK',
    },
    {
      id: 'ab',
      name: 'AB',
    },
    {
      id: 'nl',
      name: 'NL',
    },
  ];

  const [addressData, setAddressData] = useState({
    line1: '',
    line2: '',
    city: '',
    province: '',
    postcode: '',
  });

  useEffect(() => {
    setAddress(addressData);
  }, [setAddress, addressData]);

  return (
    <div>
      <h1 className="py-5 text-white">Address</h1>
      <div className="mb-2 flex gap-4">
        <Input
          value={addressData.line1}
          placeholder="Line 1"
          onChange={({ target: { value } }) =>
            setAddressData({ ...addressData, line1: value })
          }
        />
        <Input
          value={addressData.line2}
          placeholder="Line 2"
          onChange={({ target: { value } }) =>
            setAddressData({ ...addressData, line2: value })
          }
        />
      </div>
      <div className="mb-2 flex gap-3">
        <Input
          value={addressData.city}
          placeholder="City"
          onChange={({ target: { value } }) =>
            setAddressData({ ...addressData, city: value })
          }
        />
        <Input
          value={addressData.postcode}
          placeholder="Postcode"
          onChange={({ target: { value } }) =>
            setAddressData({ ...addressData, postcode: value })
          }
        />
      </div>
      <DropDown
        data={provinces}
        name="Provinces"
        setSelect={(data: any) => setAddressData({ ...addressData, province: data })}
      />
    </div>
  );
};

export default AddressInputs;
