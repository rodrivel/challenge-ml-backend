import { createResponseObject } from './items.service';

const mockPayload = jest.fn(() => (
  {
    results: [],
    filters: [
      {
        id: 'category',
        values: [
          {
            path_from_root: [
              { name: 'Name X' },
            ],
          },
        ],
      },
    ],
  }
));

describe('Items Services', () => {
  it('createResponseObject for list items must contain keys "author", "items" & "categories"', () => {
    const createdResponse = createResponseObject('list', mockPayload());
    expect(createdResponse).toHaveProperty('items');
    expect(createdResponse).toHaveProperty('categories');
    expect(createdResponse).toHaveProperty('author');
  });

  it('createResponseObject for get item must contain keys "author", "item", "sold_quantity" & "description"', () => {
    const createdResponse = createResponseObject('get', mockPayload());
    expect(createdResponse).toHaveProperty('item');
    expect(createdResponse.item).toHaveProperty('sold_quantity');
    expect(createdResponse.item).toHaveProperty('description');
  });
});
