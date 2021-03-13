import express from 'express';
import { listItemsController } from '../controllers/items.controller';
import { listItemsValidator } from '../validations/items.validation';

const router = express.Router();

router.get('', listItemsValidator, listItemsController);

export default router;