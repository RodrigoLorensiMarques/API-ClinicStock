import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = "http://localhost:5124/Material/" 

export const getMaterials = async () => {
    try {
        const response = await axios.get(API_URL+"GetAll");
        return response.data;
    } catch (error) {
        throw new Error(error.massage);
    }
};


export const deleteMaterial = async (id) => {
    try {
        await axios.delete(`${API_URL}${id}`);
   } catch (error) {
        console.log("Error", error);
    }
}

export const addNewMaterial = async (dados) => {
    try {
        const result = await axios.post(API_URL, dados);

        if (result.status === 200) {
            return { success: true, data: result };
        }


   } catch (error) {
        console.log("Error", error);
        return { success: false, message: "Erro de comunicação com servidor" };
    }
}

export const editMaterial = async (id, dados) => {
    try {
        await axios.put(`${API_URL}?id=${id}`, dados);
        
   } catch (error) {
        console.log("Error", error);
        console.log(dados);
    }
}
