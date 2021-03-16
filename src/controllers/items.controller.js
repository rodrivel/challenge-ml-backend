import { validationResult } from 'express-validator';
import { listItemsService, getItemService, ResponseService } from '../services/items.service';

export const listItemsController = async (req, res) => {
  /*
        #swagger.tags = ['Items']
        #swagger.description = 'Endpoint for searching Mercadolibre items.'
  */

  const errors = validationResult(req);

  // if request validation has errors, return bad request
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { responseStatus, responseJson } = await listItemsService(req.query.q)
    .then((data) => ({ responseStatus: 200, responseJson: ResponseService.success('list', data) }))
    .catch(() => ({ responseStatus: 502, responseJson: ResponseService.unavailable() }));

  return res.status(responseStatus).json(responseJson);
};

export const getItemController = async (req, res) => {
  /*
    #swagger.tags = ['Items']
    #swagger.description = 'Endpoint for getting an item by id.'
  */

  const errors = validationResult(req);

  // if request validation has errors, return bad request
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { responseStatus, responseJson } = await getItemService(req.params.id)
    .then((data) => ({ responseStatus: 200, responseJson: ResponseService.success('get', data) }))
    .catch(() => ({ responseStatus: 502, responseJson: ResponseService.unavailable() }));

  return res.status(responseStatus).json(responseJson);
};
