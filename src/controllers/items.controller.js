import { validationResult } from 'express-validator';
import { listItemsService, getItemService, ResponseService } from '../services/items.service';

const listItemsController = (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    let apiResponse = listItemsService(req.query.q);    
    
    apiResponse
        .then(data => {        
            return res.json(ResponseService.success('list', data));        
        })
        .catch(error => {        
            return res.status(503).json(ResponseService.apiUnavailable());
        });    
}

const getItemController = (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };
    
    let apiResponse = getItemService(req.params.id);
    
    apiResponse
        .then(data => {            
            return res.json(ResponseService.success('get', data));
        })
        .catch(error => {                    
            return res.status(503).json(ResponseService.apiUnavailable());
        });    
}

export {
    listItemsController,
    getItemController
}