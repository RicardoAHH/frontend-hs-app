// src/libs/axios/users.js
import instance from "."; // Asegúrate de que esta ruta sea correcta

export async function updateUser(userId, body) {
    try {
        const { data, status } = await instance.put(`api/v1/users/${userId}`, body);
        return { data, status };
    } catch (error) {
        throw error;
    }
}

export async function getUser (userId) {
    try {
        const { data } = await instance.get(`api/v1/users/${userId}`);
        return data; // Asegúrate de que la respuesta tenga la estructura correcta
    } catch (error) {
        throw error;
    }
}


// https://www.hs-service.api.crealape.com/api/v1/auth/profile