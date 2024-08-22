import { api } from '../createApiInstance';
import { UPLOAD_URL } from './constants';

export const uploadImage = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  const {
    data: { Location },
  } = await api.put(UPLOAD_URL.PRODUCT_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return Location;
};
