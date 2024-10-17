import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';

import cors from 'cors';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/appError';


const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());



//@ts-ignore
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});


export default app;

