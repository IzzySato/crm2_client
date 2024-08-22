import { api } from '../createApiInstance';
import { uploadImage } from '../upload';
import { PRODUCT_URL } from './constants';

export const getProducts = async (params = {}) => {
  return await api.get(PRODUCT_URL.BASE, { params });
};

export const addProduct = async (body: any) => {
  let imageUrl = '';
  if (body.imageUrl === '' && body.file) {
    imageUrl = await uploadImage(body.file);
    delete body.file;
  }
  return await api.post(
    PRODUCT_URL.BASE,
    imageUrl ? { ...body, imageUrl } : body
  );
};

export const updateProduct = async (id: string, body: any) => {
  let imageUrl = ''
  if (!body.imageUrl && body.file) {
    imageUrl = await uploadImage(body.file);
    delete body.file;
  }
  return await api.put(
    `${PRODUCT_URL.BASE}/${id}`,
    imageUrl ? { ...body, imageUrl } : body
  );
};

export const getProductById = async (id: string) => {
  return await api.get(`${PRODUCT_URL.BASE}/${id}`);
};
