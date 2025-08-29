import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  jwt: {
    acc: {
      secret: process.env.JWT_ACC_SECRET,
      expires: process.env.JWT_ACC_EXPIRES,
    },
    rsh: {
      secret: process.env.JWT_RSH_SECRET,
      expires: process.env.JWT_RSH_EXPIRES,
    },
  },
}));
