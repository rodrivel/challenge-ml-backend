import { query } from 'express-validator';

const listItemsValidator = [	
	query('q').not().isEmpty().withMessage('must not be empty')
]

export {
	listItemsValidator
}