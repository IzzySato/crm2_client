import { FC, useEffect, useState } from 'react';
import Input from '../../atoms/input';
import DropDown from '../../atoms/dropdown';
import { getAddressById } from '../../../api/address';
import { PROVINCES } from './constants';
import { getUpdatedObject } from '../../../utils/update';

type InputFieldProps = {
  setAddress: (data: any) => void;
  addressIds: string[];
  isCreate?: boolean;
};

const AddressInputs: FC<InputFieldProps> = ({
  isCreate = true,
  addressIds,
  setAddress,
}) => {
  const [addressData, setAddressData] = useState({
    _id: '',
    line1: '',
    line2: '',
    city: '',
    province: '',
    postcode: '',
  });

  const [oldAddressData, setOldAddressData] = useState({
    _id: '',
    line1: '',
    line2: '',
    city: '',
    province: '',
    postcode: '',
  });

  const [selectedProvince, setSelectedProvince] = useState('Provinces');

  useEffect(() => {
    const keys = ['line1', 'line2', 'city', 'province', 'postcode'];
    const address = getUpdatedObject(keys, oldAddressData, addressData);
    setAddress(address);
  }, [addressData]);

  useEffect(() => {
    (async () => {
      if (!isCreate && addressIds[0]) {
        const { data } = await getAddressById(addressIds[0]);
        if (data) {
          setOldAddressData({ ...data });
          setAddressData({
            _id: data._id,
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
        data={PROVINCES}
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
