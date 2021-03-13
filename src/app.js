import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import itemsRoutes from './routes/items.route';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/items', itemsRoutes);


app.listen(process.env.PORT || 5000, ()=> {
    console.log(`App listening on port ${process.env.PORT || 5000 }`);
});