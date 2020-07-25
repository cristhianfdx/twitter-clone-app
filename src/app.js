import Express, { json, urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import swagger from './routes/swagger';
import indexRouter from './routes/index';

const app = Express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Routes
app.use('/', swagger);
app.use('/', indexRouter);

export default app;
