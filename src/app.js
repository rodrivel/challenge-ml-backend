import express from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger-output.json';
import itemsRoutes from './routes/items.route';
import { MAX_API_REQUESTS_PER_MINUTE } from './variables';

// configure api request limit
const limiter = rateLimit({
  windowMs: 60000,
  max: MAX_API_REQUESTS_PER_MINUTE || 60,
  message: {
    error: 'Too many requests',
  },
});

const app = express();

// helmet middleware for improved security
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());

// enable gzip compression
app.use(compression());

// enable cors
app.use(cors());

// ensure json format for body
app.use(bodyParser.json());

// serve swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// routing

app.use('/api/items', limiter, itemsRoutes);

export default app;
