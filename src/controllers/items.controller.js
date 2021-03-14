import { validationResult } from 'express-validator';
import { getItemsService, ResponseService } from '../services/items.service';

const listItemsController = (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    let apiResponse = getItemsService(req.query.q);    
    
    apiResponse.then(data => {        
        return res.json(ResponseService.success(data));        
    }).catch(error => {        
        return res.status(503).json(ResponseService.apiUnavailable());        
    });    
}

export {
    listItemsController
}