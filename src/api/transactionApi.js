import axios from "axios";
import {basicUrl} from "./url.js";
import {getToken} from "./localStorageFunctions.js";

//Создание транзакций пользователя
export async function postTransaction(requestData) {
    try{
        const token = await getToken();
        const response = await axios.post(`${basicUrl}/Transaction`, requestData, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status;
    }catch(err){
        return err.status;
    }
}

//Получение транзакций пользователя
export async function getTransactions() {
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/Transaction`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    }catch(err){
        return err.status;
    }
}

//Получение транзакций пользователя по логину
export async function getLoginTransactions(login) {
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/Transaction/${login}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    }catch(err){
        return err.status;
    }
}