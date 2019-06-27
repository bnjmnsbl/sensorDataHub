import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export class APIService{

    constructor(){
    }
    
    getAllSensors() {
    
    const url = `${API_URL}`;
    
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
    }
}