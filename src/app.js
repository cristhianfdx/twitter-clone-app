import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

import Express, { json, urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

import jwtMiddleware from './middlewares/jwt_middleware';

import swagger from './routes/swagger';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import authRouter from './routes/auth';

const app = Express();

// Database connection
import './database';

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(passport.initialize());
passport.use(jwtMiddleware);

// Routes
app.use('/', swagger);
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  res.status(404).json('Not found.');
});

export default app;
