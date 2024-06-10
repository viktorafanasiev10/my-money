import * as process from 'process';

export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 30001,
  db: {
    url: process.env.DB_URL,
  },
});
