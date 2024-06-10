// src/index.ts
import express from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import { authRoutes } from './routes/user.router';
import { productRoutes } from './routes/product.router';

dotenv.config();

const app = express();

app.use(json());
app.use('/api', authRoutes);
app.use('/api', productRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
