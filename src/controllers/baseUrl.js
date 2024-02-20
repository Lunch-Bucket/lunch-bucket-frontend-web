// BaseUrl.js
import devConfig from '../config/dev';
import prodConfig from '../config/prod';

// const config = process.env.NODE_ENV === 'development' ? prodConfig : devConfig;
const config = devConfig;

export const projectCode = config.projectCode;
export const baseUrl = config.baseUrl;
export const expertUrl = config.expertUrl;
export const loginUrl = config.loginUrl;

export default baseUrl;
