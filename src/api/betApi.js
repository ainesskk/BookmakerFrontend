import {basicUrl} from "./url.js";
import axios from "axios";
import {getToken} from "./localStorageFunctions.js";

//Создание ставки пользователя
export async function postBet(coefficientId, requestData){
    try{
        const token = await getToken();
        const response = await axios.post(`${basicUrl}/Coefficient/${coefficientId}/Bet`, requestData, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status;
    }catch(err){
        return err.status;
    }
}

//Получение ставок пользователя
export async function getUserBets(){
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/Bet/User/92222158-0839-4585-858a-a04a7cf8a892/Bet`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    }catch(err){
        return err.status;
    }
}

//Удаление ставки пользователя
export async function deleteBet(betId){
    try{
        const token = await getToken();
        const response = await axios.delete(`${basicUrl}/Bet/${betId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status;
    }catch(err){
        return err.status;
    }
}