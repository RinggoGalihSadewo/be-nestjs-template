import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { jwtConfig } from 'src/config/jwt.config';
import { UsersController } from './users.controller';
import { UsersModel } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    SequelizeModule.forFeature([UsersModel]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
