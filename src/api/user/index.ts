import API from '../index';
import { USER_URL } from './constants';

export const addUser = async (body = {}) => {
  return await API.post(USER_URL.BASE, body);
};

