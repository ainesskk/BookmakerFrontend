import axios from "axios";
import {basicUrl} from "./url.js";

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