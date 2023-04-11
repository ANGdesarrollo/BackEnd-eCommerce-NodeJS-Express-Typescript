const mode = 'PRODUCTION'
export const API_URL = mode === 'PRODUCTION' ?
    'https://backend-ecommerce-node-production.up.railway.app' :
    'http://localhost:8080'
