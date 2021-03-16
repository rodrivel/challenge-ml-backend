import { validationResult } from 'express-validator';
import { listItemsService, getItemService, ResponseService } from '../services/items.service';

const listItemsController = (req, res) => {
    /*  
        #swagger.tags = ['Items']
        #swagger.description = 'Endpoint for searching Mercadolibre items.' 
    */
        
    const errors = validationResult(req);
    
    // if request validation has errors, return bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    // 
    let apiResponse = listItemsService(req.query.q);    
    
    apiResponse
        .then(data => {          
            return res.status(200).json(ResponseService.success('list', data));
        })
        .catch(error => {                    
            return res.status(502).json(ResponseService.unavailable());
        });
}

const getItemController = (req, res) => {
    /*  
        #swagger.tags = ['Items']
        #swagger.description = 'Endpoint for getting an item by id.' 
    */

    const errors = validationResult(req);
    
    // if request validation has errors, return bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    
    let apiResponse = getItemService(req.params.id);
    
    apiResponse
        .then(data => {            
            return res.status(200).json(ResponseService.success('get', data));
        })
        .catch(error => {                    
            return res.status(502).json(ResponseService.unavailable());
        });
}

export {
    listItemsController,
    getItemController
}