import {basicUrl} from "./url.js";
import axios from "axios";
import {getToken} from "./localStorageFunctions.js";

//Получение событий по поиску
export async function getEvents(searchString) {
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/Event/Search/${searchString}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    }catch(err){
        return err.status;
    }
}

//Получение события по id
export async function getEvent(eventId) {
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/Event/${eventId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    }catch(err){
        return err.status;
    }
}

//Изменение данных события
export async function putEvent(eventId, requestData){
    try{
        const token = await getToken();
        const response = await axios.put(`${basicUrl}/Event/${eventId}`, requestData, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status;
    }catch(err){
        return err.status;
    }
}