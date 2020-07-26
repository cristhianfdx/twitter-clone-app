import mongoose from 'mongoose';

import config from './config/config';

mongoose.connect(config.DB.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established');
});

connection.on('error', (err) => {
  console.error(err);
  process.exit(0);
});
