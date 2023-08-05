import { JwtModuleOptions } from '@nestjs/jwt';
import 'dotenv/config';

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET_KEY,
  signOptions: {
    expiresIn: '1h',
  },
};
