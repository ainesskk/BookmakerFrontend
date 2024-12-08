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
        return response;
    }catch(err){
        return err;
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

//Получение событий по поиску
export async function getUsers(searchString) {
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/User/Search/${searchString}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    }catch(err){
        return err.status;
    }
}

//Редактирование роли
export async function postUserRole(login, requestData) {
    try {
        const token = await getToken();
        const response = await axios.post(`${basicUrl}/User/${login}/Role`, requestData, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status;
    } catch (err) {
        return err.response.status;

    }
}

//Получение данных пользователя по логину
export async function getUserLogin(login) {
    try {
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/User/${login}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (err) {
        if (err.response) {
            console.error("Response error:", err.response.data);
            return err.response.status;
        } else {
            console.error("Error:", err.message);
            return 500;
        }
    }
}