import API from '../index';
import { uploadImage } from '../upload';
import { PRODUCT_URL } from './constants';

export const getProducts = async (params = {}) => {
  return await API.get(PRODUCT_URL.BASE, { params });
};

export const addProduct = async (body: any) => {
  const imageUrl = await uploadImage(body.file);
  if (body.file) {
    delete body.file;
  }
  return await API.post(
    PRODUCT_URL.BASE,
    imageUrl ? { ...body, imageUrl } : body
  );
};

export const updateProduct = async (id: string, body: any) => {
  const imageUrl = await uploadImage(body.file);
  if (body.file) {
    delete body.file;
  }
  return await API.put(
    `${PRODUCT_URL.BASE}/${id}`,
    imageUrl ? { ...body, imageUrl } : body
  );
};

export const getProductById = async (id: string) => {
  return await API.get(`${PRODUCT_URL.BASE}/${id}`);
};
