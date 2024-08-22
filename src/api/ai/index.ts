import { aiApi } from '../createApiInstance';
import { AI_URL } from './constants';

export const getImageDescription = async (body = {}) => {
  return await aiApi.post(AI_URL.DESCRIPTION, body);
};
