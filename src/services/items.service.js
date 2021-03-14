import axios from 'axios';
const API_MAX_RESULTS = 4;

class ResponseService {
    static success(payload) {                
        return createResponseObject(payload);
    }

    static apiUnavailable() {
        return { message : 'SERVICE_UNAVAILABLE' };
    }
}

const createResponseObject = (payload) => {
    let responseObject = {
        "author" : {
            "name" : "Rodrigo",
            "lastname": "Velazquez"
        }        
    };
    let items = [];
    let categories = [];

    let category_filter = payload.filters?.find(fObj => fObj.id === 'category');    
    if (category_filter)
        categories = category_filter.values[0]?.path_from_root?.map(pfr => pfr.name);
        
    items = payload.results?.map(r => {
        let priceAmount = Number.parseFloat(r.price);
        return {
            "id": r.id || "",
            "title": r.title || "",
            "price" : {
                "currency": r.currency_id || "",
                "amount" : priceAmount,
                "decimals" : priceAmount - Math.floor(priceAmount)                 
            },
            "picture": r.thumbnail || "",
            "condition": r.condition || "",
            "free_shipping": r.shipping?.free_shipping || false
        };
    });
    
    responseObject.categories = categories;
    responseObject.items = items;
    return responseObject;
}

const getItemsService = (q) => {
    return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=${API_MAX_RESULTS || 50}`)
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