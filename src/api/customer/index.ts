import { api } from '../createApiInstance';
import { CUSTOMER_URL } from './constants';

export const getCustomers = async (params = {}) => {
  return await api.get(CUSTOMER_URL.BASE, { params });
};

export const getCustomerById = async (id: string) => {
  return await api.get(`${CUSTOMER_URL.BASE}/${id}`);
};

export const addCustomer = async (body = {}) => {
  return await api.post(CUSTOMER_URL.BASE, body);
};

export const updateCustomer = async (id: string, body = {}) => {
  return await api.put(`${CUSTOMER_URL.BASE}/${id}`, body);
};