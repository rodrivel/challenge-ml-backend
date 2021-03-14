import axios from 'axios';
import { GET_ITEMS_API_MAX_RESULTS } from '../variables/';

class ResponseService {
    static success(action, payload) {                
        return createResponseObject(action, payload);
    }

    static apiUnavailable() {
        return { message : 'SERVICE_UNAVAILABLE' };
    }
}

const createResponseObject = (action, payload) => {
    let responseObject = {
        "author" : {
            "name" : "Rodrigo",
            "lastname": "Velazquez"
        }        
    };

    switch (action) {
        case 'list':
            let items = [];
            let categories = [];
            let category_filter = payload.filters?.find(fObj => fObj.id === 'category');    
            
            if (category_filter)
                categories = category_filter.values[0]?.path_from_root?.map(pfr => pfr.name);
                
            items = payload.results?.map(r => {
                return getItemData(r);        
            });
            
            responseObject.categories = categories;
            responseObject.items = items;
            break;

        case 'get':
            let item = getItemDataHelper(payload);
            item.sold_quantity = payload.sold_quantity;            
            responseObject.item = { ...item };
            // handle description
            break;

        default:
            break;
    }
    
    
    return responseObject;
}

const getItemDataHelper = (item) => {
    let priceAmount = Number.parseFloat(item.price);
    return {
        "id": item.id || "",
        "title": item.title || "",
        "price" : {
            "currency": item.currency_id || "",
            "amount" : priceAmount,
            "decimals" : priceAmount - Math.floor(priceAmount)                 
        },
        "picture": item.thumbnail || "",
        "condition": item.condition || "",
        "free_shipping": item.shipping?.free_shipping || false
    };
}

const listItemsService = (q) => {
    return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=${GET_ITEMS_API_MAX_RESULTS || 50}`)
        .then(response => {                        
            return response.data;
        })
        .catch(error => {            
            throw error;
        });
}

const getItemService = (id) => {
    return axios.get(`https://api.mercadolibre.com/items/${id}`)
        .then(response => {                        
            return response.data;
        })
        .catch(error => {            
            throw error;
        });
}

export {
    listItemsService,
    getItemService,
    ResponseService
}