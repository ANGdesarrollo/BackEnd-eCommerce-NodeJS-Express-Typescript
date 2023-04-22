//@ts-nocheck

let API;
const MODE = 'PRODUCTION';
const DEVELOPMENT_URL = 'http://localhost:8080';
const PRODUCTION_URL = 'https://backend-ecommerce-node-production.up.railway.app';

if (MODE === 'DEVELOPMENT') {
  API = DEVELOPMENT_URL;
} else {
  API = PRODUCTION_URL;
}

export const API_URL = API;
