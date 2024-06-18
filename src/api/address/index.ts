import API from '../index';
import { URL } from './constants';

export const getAddress = async () => {
  return await API.get(URL.BASE);
};