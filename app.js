import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import productsRouter from './router/products.js';

const app = express();

// const corsOption = {
//   origin: config.cors.allowedOrigin,
//   optionSuccessStatus: 200,
// };

app.use(express.json());
app.use(helmet());
// app.use(cors(corsOption));
app.use(cors());
app.use(morgan('tiny'));

app.use('/products', productsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
