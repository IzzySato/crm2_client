import API from '../index';
import { ADDRESS_URL } from './constants';

export const getAddressById = async (id: string) => {
  return await API.get(`${ADDRESS_URL.BASE}/${id}`);
};

export const addAddress = async (body: any) => {
  return await API.post(ADDRESS_URL.BASE, body);
};

export const updateAddress = async (id: string, body: any) => {
  return await API.put(`${ADDRESS_URL.BASE}/${id}`, body);
};