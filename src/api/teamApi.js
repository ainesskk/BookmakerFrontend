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