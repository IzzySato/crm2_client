import { FC, useEffect, useState } from 'react';
import Input from '../../atoms/input';
import DropDown from '../../atoms/dropdown';
import { getAddressById } from '../../../api/address';

type InputFieldProps = {
  setAddress: (data: any) => void;
  setAddressOriginalData: (data: any) => void
  addressIds: string[];
  isCreate?: boolean;
};

const AddressInputs: FC<InputFieldProps> = ({
  isCreate = true,
  setAddressOriginalData,
  addressIds,
  setAddress,
}) => {
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

  const [selectedProvince, setSelectedProvince] = useState('Provinces');

  useEffect(() => {
    setAddress(addressData);
  }, [addressData]);

  useEffect(() => {
    (async () => {
      if (!isCreate && addressIds[0]) {
        const { data } = await getAddressById(addressIds[0]);
        setAddressOriginalData(data);
        if (data) {
          setAddressData({
            line1: data.line1,
            line2: data.line2,
            city: data.city,
            province: data.province,
            postcode: data.postcode,
          });
          setSelectedProvince(data.province);
        }
      }
    })();
  }, [addressIds]);

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
        name={selectedProvince}
        setSelect={(data: any) => {
          setAddressData({ ...addressData, province: data });
          setSelectedProvince(data);
        }}
      />
    </div>
  );
};

export default AddressInputs;
