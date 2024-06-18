import API from '../index';
import { CUSTOMER_URL } from './constants';

export const getCustomers = async (params = {}) => {
  return await API.get(CUSTOMER_URL.BASE, { params });
};

export const addCustomer = async (body = {}) => {
  return await API.post(CUSTOMER_URL.BASE, body);
};

export const updateCustomer = async (id: string, body = {}) => {
  return await API.put(`${CUSTOMER_URL.BASE}/${id}`, body);
};