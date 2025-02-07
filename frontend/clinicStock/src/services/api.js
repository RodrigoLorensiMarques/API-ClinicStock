import { useState, useEffect } from 'react'
import axios from 'axios'
import { data } from 'react-router-dom';

const API_URL = "http://localhost:5124/" 

export const getItems = async (itemRequest) => {
    try {
        const response = await axios.get(API_URL + itemRequest + "/GetAll");
        return response.data;
    } catch (error) {
        throw new Error(error.massage);
    }
};


export const deleteItem = async (itemRequest,id) => {
    try {
        await axios.delete(`${API_URL+itemRequest}/${id}`);
   } catch (error) {
        console.log("Error", error);
    }
}

export const addNewItem = async (itemRequest, dados) => {
    try {
        const result = await axios.post(API_URL + itemRequest, dados);

        if (result.status === 200) {
            return { success: true, data: result };
        }


   } catch (error) {
        console.log("Error", error);
        return { success: false, message: "Erro de comunicação com servidor" };
    }
}

export const editItem = async (itemRequest, id, dados) => {
    try {
        await axios.put(`${API_URL + itemRequest}?id=${id}`, dados);
        
   } catch (error) {
        console.log("Error", error);
        console.log(dados);
    }
}
