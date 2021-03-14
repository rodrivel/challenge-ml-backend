import express from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import itemsRoutes from './routes/items.route';
import rateLimit from 'express-rate-limit';


const limiter = rateLimit({
    windowMs: 60000,
    max: process.env.CALL_PER_MINUTE || 60,
    message: {
      error: "Too many requests"
    }
  });
  
const app = express();
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/items', limiter, itemsRoutes);


app.listen(process.env.PORT || 5000, ()=> {
    console.log(`App listening on port ${process.env.PORT || 5000 }`);
});