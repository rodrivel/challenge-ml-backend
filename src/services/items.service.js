import axios from 'axios';
import { GET_ITEMS_API_MAX_RESULTS } from '../variables';

const proccessThumbnail = (thumbnail, sizeId) => (thumbnail ? thumbnail.replace(/(-[A-Z])(\.\w{3,4})$/, `-${sizeId}$2`) : null);
const proccessItemCondition = (itemCondition) => {
  let res;
  switch (itemCondition) {
    case 'new':
      res = 'Nuevo';
      break;
    case 'used':
      res = 'Usado';
      break;
    default:
      res = null;
  }
  return res;
};

const getItemData = (item, action) => {
  const priceInteger = parseInt(item.price, 10);
  const priceDecimalPart = (parseFloat(item.price) - Math.floor(item.price)).toFixed(2) * 100;
  let itemAux = {};

  switch (action) {
    case 'get':
      itemAux = {
        id: item.id || '',
        title: item.title || '',
        price: {
          currency: item.currency_id || '',
          amount: priceInteger,
          decimals: priceDecimalPart,
        },
        pictures: item.pictures ? item.pictures.map((p) => ({ ...p, secure_url: proccessThumbnail(p.secure_url, 'B') })) : [],
        condition: proccessItemCondition(item.condition) || '',
        free_shipping: item.shipping?.free_shipping || false,
        sold_quantity: item.sold_quantity || 0,
        description: item.description || '',
        categories: item.categories || [],
      };

      break;

    case 'list':
      itemAux = {
        id: item.id || '',
        title: item.title || '',
        price: {
          currency: item.currency_id || '',
          amount: priceInteger,
          decimals: priceDecimalPart,
        },
        picture: proccessThumbnail(item.thumbnail, 'N') || '',
        condition: proccessItemCondition(item.condition) || '',
        free_shipping: item.shipping?.free_shipping || false,
        address: item.address || null,
      };
      break;

    default:
      break;
  }
  return itemAux;
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

      items = payload.results?.map((r) => getItemData(r, action));
      responseObject.categories = categories;
      responseObject.items = items;
      break;

    case 'get':
      item = getItemData(payload, action);
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

export const getItemService = async (id) => {
  // get main data
  const mainData = await axios.get(`https://api.mercadolibre.com/items/${id}`).then((response) => response.data).catch(console.log);
  // get categories
  const categories = await axios.get(`https://api.mercadolibre.com/categories/${mainData.category_id}`).then((response) => response.data).catch(console.log);
  // get description
  const description = await axios.get(`https://api.mercadolibre.com/items/${id}/description/`).then((response) => response.data).catch(console.log);

  const itemData = {
    ...mainData,
    description: description?.plain_text,
    categories: categories?.path_from_root?.map((pfr) => pfr.name),
  };

  return itemData;
};

export class ResponseService {
  static success(action, payload) {
    return createResponseObject(action, payload);
  }

  static unavailable() {
    return { message: 'MELI_SERVICE_UNAVAILABLE_OR_WITH_ERRORS' };
  }
}
