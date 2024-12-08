import axios from "axios";
import {basicUrl} from "./url.js";
import {getToken} from "./localStorageFunctions.js";

export async function getTeamWithId(teamId){
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/Team/${teamId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch(err){
        return err;
    }
}

//Получение команд по поиску
export async function getTeams(searchString) {
    try{
        const token = await getToken();
        const response = await axios.get(`${basicUrl}/Team/Search/${searchString}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    }catch(err){
        return err.status;
    }
}

//Удаление команды
export async function deleteTeam(teamId){
    try{
        const token = await getToken();
        const response = await axios.delete(`${basicUrl}/Team/${teamId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status;
    }catch(err){
        return err.status;
    }
}

//Создание команды
export async function postTeam(requestData){
    try{
        const token = await getToken();
        const response = await axios.post(`${basicUrl}/Team`, requestData, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status;
    }catch(err){
        return err.status;
    }
}

//Изменение данных команды
export async function putTeam(teamId, requestData){
    try{
        const token = await getToken();
        const response = await axios.put(`${basicUrl}/Team/${teamId}`, requestData, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status;
    }catch(err){
        return err.status;
    }
}