import { query, param } from 'express-validator';

const listItemsValidator = [	
	query('q').not().isEmpty().withMessage('must not be empty')
]

const getItemValidator = [	
	param('id').not().isEmpty().withMessage('must not be empty')
]

export {
	listItemsValidator,
	getItemValidator
}