import express from 'express';
import { listItemsController, getItemController } from '../controllers/items.controller';
import { listItemsValidator, getItemValidator } from '../validations/items.validation';

const router = express.Router();

router.get('', listItemsValidator, listItemsController);
router.get('/:id', getItemValidator, getItemController);

export default router;