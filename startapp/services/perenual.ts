import axios from 'axios';

export interface Plant {
  id: number;
  common_name: string | null;
  scientific_name: string[]; 
  other_name: string[] | null; 
  watering: string; 
  sunlight: string[]; 
  default_image?: {
    thumbnail: string;
    small_url: string;
    regular_url: string;
    original_url: string;
  };
}

const API_KEY = 'sk-u8tW6851c01a730d311052';
const BASE_URL = 'https://perenual.com/api/v2';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Função que busca as plantas pela query
export async function searchPlants(query: string): Promise<Plant[]> {
  try {
    const res = await api.get('/species-list', {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    console.log('API retornou:', res.data.data); 
    return res.data.data as Plant[]; // retorna só os dados
  } catch (erro) {
    console.error('Deu erro ao buscar plantas:', erro); 
    return []; 
  }
}

// Função pra pegar detalhes da planta pelo id
export async function getPlantById(id: number): Promise<Plant | null> {
  try {
    const res = await api.get(`/species/details/${id}`, {
      params: {
        key: API_KEY,
      },
    });
    console.log('Detalhes da planta:', res.data); 
    return res.data as Plant; // retorna os detalhes
  } catch (erro) {
    console.error('Erro ao pegar detalhes da planta:', erro);
    return null; 
  }
}
