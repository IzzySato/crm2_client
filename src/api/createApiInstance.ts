import { createApiInstance } from '.';

export const api = createApiInstance(
  process.env.REACT_APP_API_URL || 'http://localhost:8080/'
);
export const aiApi = createApiInstance(
  process.env.AI_API_URL || 'http://127.0.0.1:5000/'
);
