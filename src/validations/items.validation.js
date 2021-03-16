import { query, param } from 'express-validator';

export const listItemsValidator = [
  query('q').not().isEmpty().withMessage('must not be empty'),
];

export const getItemValidator = [
  param('id').not().isEmpty().withMessage('must not be empty'),
];
