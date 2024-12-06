import axios from "axios";
import {basicUrl} from "./url.js";
import {getToken, setData} from "./localStorageFunctions.js";

//Регистрация пользователя
export async function postAccount(requestData){
    try{
        console.log(requestData);
        const response = await axios.post(`${basicUrl}/Account`, requestData);
        return response.status;
    }catch(err){
        return err.status;
    }
}

//Вход в аккаунт пользователя
export async function postAccountAuth(requestData){
    try{
        const response = await axios.post(`${basicUrl}/Account/auth-token`, requestData);
        return response.data;
    }catch(err){
        return err.status;
    }
}

//Получение данных пользователя
export async function getUser(){
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/User`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        await setData(response.data);
    }catch(err){
        console.log(err);
    }
}

//Изменение данных пользователя
export async function putUser(requestData){
    try{
        const token = await getToken();
        const response = await axios.put(`${basicUrl}/User`, requestData, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status;
    }catch(err){
        return err.status;
    }
}

//Получение баланса пользователя
export async function getUserBalance(){
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/User`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data.balance
    }catch(err){
        return err;
    }
}