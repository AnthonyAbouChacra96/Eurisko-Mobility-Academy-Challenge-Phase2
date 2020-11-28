import axios from 'axios';

import {URL, KEY} from '@env';

const MyInstance = axios.create({
  baseURL: URL,
});

MyInstance.interceptors.request.use((config) => {
  config.params = {
    'api-key': KEY,
    ...config.params,
  };
  // console.log('interceptor', config);
  return config;
});

export default MyInstance;
