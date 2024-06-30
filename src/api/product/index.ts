import API from '../index';
import { PRODUCT_URL } from './constants';

export const getProducts = async (params = {}) => {
  return await API.get(PRODUCT_URL.BASE, { params });
};

export const addProduct = async (body = {}) => {
  return await API.post(PRODUCT_URL.BASE, body);
};

export const updateProduct = async (id: string, body = {}) => {
  return await API.post(`${PRODUCT_URL.BASE}/${id}`, body);
};