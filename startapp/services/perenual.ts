import axios from 'axios';

const API_KEY = 'sk-u8tW6851c01a730d311052';
const BASE_URL = 'https://perenual.com/api';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY
    },
});

export async function searchPlants(query: string) {
    try {
        const response = await api.get('/species-list', {
            params: {
                q: query,

            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar plantas:', error);
        return [];
    }
}

export async function getPlantDetails(id: number) {
    try {
        const response = await api.get(`/species/details/${id}`);
        const data = response.data

        return {
            id: data.id,
            name: data.common_name,
            scientificName: data.scientific_name,
            otherNames: data.other_name,
            watering: data.watering,
            imageUrl: data.default_image?.original_url || null,
            sunlight: data.sunlight,
            descripition: data.descripition
        };
    } catch(error) {
        console.error('Erro ao obter detalhes da planta:', error);
        return null;
    }
}