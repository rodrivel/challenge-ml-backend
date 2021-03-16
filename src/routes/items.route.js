import express from 'express';
import { listItemsController, getItemController } from '../controllers/items.controller';
import { listItemsValidator, getItemValidator } from '../validations/items.validation';

const router = express.Router();

// define API routes
router.get('/:id', getItemValidator, getItemController);
router.get('', listItemsValidator, listItemsController);

export default router;