import { api } from '../createApiInstance';
import { ADDRESS_URL } from './constants';

export const getAddressById = async (id: string) => {
  return await api.get(`${ADDRESS_URL.BASE}/${id}`);
};

export const addAddress = async (body: any) => {
  return await api.post(ADDRESS_URL.BASE, body);
};

export const updateAddress = async (id: string, body: any) => {
  return await api.put(`${ADDRESS_URL.BASE}/${id}`, body);
};