import request from 'supertest';
import app from '../app';


describe('Items Endpoints', () => {
    it('should fetch a single item when :id exists', async () => {
        const id = "MLA885104130";
        const res = await request(app).get(`/api/items/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('item');
    });
    
    it('should fetch multiple items when @q exists', async () => {
        const searchQuery = 'Razer';
        const res = await request(app).get(`/api/items?q=${searchQuery}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('items');        
        expect(res.body.items.length).toBeGreaterThanOrEqual(1);
    });

    it('shouldn\'t fetch a single item when :id doesn\'t exist', async () => {
        const id = "";
        const res = await request(app).get(`/api/items/${id}`);
        expect(res.statusCode).toEqual(400);        
    });

    it('shouldn\'t fetch multiple items when @q doesn\'t exist', async () => {
        const qParam = '';
        const res = await request(app).get(`/api/items?q=${qParam}`);
        expect(res.statusCode).toEqual(400);        
    });
});