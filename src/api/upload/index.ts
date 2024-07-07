import { UPLOAD_URL } from './constants';
import API from '../index';

export const uploadImage = async (file: any) => {
  if (!file) return;
  const formData = new FormData();
  formData.append('file', file);
  const {
    data: { Location },
  } = await API.put(UPLOAD_URL.PRODUCT_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return Location;
};
