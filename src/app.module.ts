import { Module } from '@nestjs/common';
import { UsersController } from './module/users/users.controller';
import { UsersModule } from './module/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import 'dotenv/config';
import { AuthModule } from './module/auth/auth.module';
import { AuthController } from './module/auth/auth.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      dialect: 'postgres',
      autoLoadModels: true,
      logging: false,
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [UsersController, AuthController],
})
export class AppModule {}
