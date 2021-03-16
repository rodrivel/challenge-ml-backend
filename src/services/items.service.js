import axios from 'axios';
import { GET_ITEMS_API_MAX_RESULTS } from '../variables';

const getItemData = (item) => {
  const priceAmount = Number.parseFloat(item.price);
  return {
    id: item.id || '',
    title: item.title || '',
    price: {
      currency: item.currency_id || '',
      amount: priceAmount,
      decimals: priceAmount - Math.floor(priceAmount),
    },
    picture: item.thumbnail || '',
    condition: item.condition || '',
    free_shipping: item.shipping?.free_shipping || false,
  };
};

export const createResponseObject = (action, payload) => {
  const responseObject = {
    author: {
      name: 'Rodrigo',
      lastname: 'Velazquez',
    },
  };

  let items = [];
  let categories = [];
  let categoryFilter;
  let item;

  switch (action) {
    case 'list':
      categoryFilter = payload.filters?.find((fObj) => fObj.id === 'category');
      if (categoryFilter) {
        categories = categoryFilter.values[0]?.path_from_root?.map((pfr) => pfr.name);
      }

      items = payload.results?.map((r) => getItemData(r));
      responseObject.categories = categories;
      responseObject.items = items;
      break;

    case 'get':
      item = getItemData(payload);
      item.sold_quantity = payload.sold_quantity;
      item.description = payload.description;
      responseObject.item = { ...item };
      break;

    default:
      break;
  }
  return responseObject;
};

export const listItemsService = (q) => axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=${GET_ITEMS_API_MAX_RESULTS || 50}`)
  .then((response) => response.data)
  .catch((error) => { throw error; });

export const getItemService = (id) => {
  const requestItem = axios.get(`https://api.mercadolibre.com/items/${id}`);
  const requestItemDescription = axios.get(`https://api.mercadolibre.com/items/${id}/description/`);

  return axios.all([requestItem, requestItemDescription])
    .then(axios.spread((...responses) => {
      const responseItem = responses[0];
      const responseItemDescription = responses[1];
      const dataWithDescription = {
        ...responseItem.data,
        description: responseItemDescription.data.plain_text,
      };
      return dataWithDescription;
    }))
    .catch((error) => { throw error; });
};

export class ResponseService {
  static success(action, payload) {
    return createResponseObject(action, payload);
  }

  static unavailable() {
    return { message: 'MELI_SERVICE_UNAVAILABLE_OR_WITH_ERRORS' };
  }
}
