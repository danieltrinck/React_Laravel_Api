import axios from 'axios';

const getDadosCep = async (cep) => {
  try {
    const url = `https://viacep.com.br/ws/${cep.replace('-','')}/json/`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return true;
  }
};

export default getDadosCep;