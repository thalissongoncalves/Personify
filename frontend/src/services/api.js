import axios from 'axios';

// Cria uma instância do axios com uma configuração padrão
const api = axios.create({
    // Define a URL base para todas as requisições
    baseURL: 'http://localhost:5000',
});

// Exporta a instância configurada do axios para ser usada em outros arquivos
export default api;