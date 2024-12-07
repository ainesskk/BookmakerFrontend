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