import API from '../index';
import { PRODUCT_URL } from './constants';

export const getProducts = async (params = {}) => {
  return await API.get(PRODUCT_URL.BASE, { params });
};

export const addProduct = async (body = { file: ''}) => {
  let imageUrl = '';
  if (body.file !== '') {
    const formData = new FormData();
    formData.append('file', body.file);
    const { data: { Location } } = await API.put(PRODUCT_URL.PRODUCT_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    imageUrl = Location;
  }
  return await API.post(PRODUCT_URL.BASE, { ...body, imageUrl });
};

export const updateProduct = async (id: string, body = {}) => {
  return await API.put(`${PRODUCT_URL.BASE}/${id}`, body);
};

export const getProductById = async (id: string) => {
  return await API.get(`${PRODUCT_URL.BASE}/${id}`);
};
