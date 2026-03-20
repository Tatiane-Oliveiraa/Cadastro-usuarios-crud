import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cadastro-usuarios-crud.onrender.com', // URL do seu FastAPI
});

export default api;