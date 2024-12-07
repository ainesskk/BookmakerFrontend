import {basicUrl} from "./url.js";
import axios from "axios";
import {getToken} from "./localStorageFunctions.js";

//Получение коэффициентов по событию
export async function getCoefficients(eventId) {
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/Event/${eventId}/Coefficient`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    }catch(err){
        return err.status;
    }
}