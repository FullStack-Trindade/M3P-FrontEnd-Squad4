import axios from 'axios';

export const ThemeConfigService = {
  getConfigurations: async (id) => {
    try {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/configuracoes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter as configurações do tema:', error);
      return null;
    }
  },

  updateConfiguration: async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/configuracoes/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar as configurações do tema:', error);
      return null;
    }
  },

  createConfiguration: async (data) => {
    try {
      const response = await axios.post(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/configuracoes`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar as configurações do tema:', error);
      return null;
    }
  },
};
