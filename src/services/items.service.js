import { rejects } from 'assert';
import axios from 'axios';
import { resolve } from 'path';
const API_MAX_RESULTS = 4;

class ResponseService {
    static successfulResponse(payload) {
        // let responseObject = {
        //     "author" : {
        //         "name" : "Rodrigo",
        //         "lastname": "Velazquez"
        //     }   ,
        //     "categories" : [],
        //     "items" : []        
        // }
        return { message : 'SUCCESS', ...payload}        
    }

    static serviceUnavailable() {
        return { message : 'SERVICE_UNAVAILABLE' }
    }
}

const getItemsService = (q) => {
    return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=${API_MAX_RESULTS}`)
        .then(response => {                        
            return response.data;
        })
        .catch(error => {            
            throw error;
        });  
}

export {
    getItemsService,
    ResponseService
}