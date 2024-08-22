import { api } from '../createApiInstance';
import { USER_URL } from './constants';

export const addUser = async (body = {}) => {
  return await api.post(USER_URL.BASE, body);
};

