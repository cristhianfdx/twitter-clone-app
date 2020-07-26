export default {
  DB: {
    URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1/twitter-clone',
  },
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
};
