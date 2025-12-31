import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se receber 401 (não autorizado), limpa o token
    // Mas não redireciona aqui para evitar recarregamento da página
    // O redirecionamento deve ser feito pelos componentes que tratam os erros
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Não redirecionar aqui - deixar os componentes tratarem o erro
    }
    return Promise.reject(error);
  }
);
