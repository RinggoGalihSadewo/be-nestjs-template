import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleController } from './role.controller';
import { RoleModel } from './role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [SequelizeModule.forFeature([RoleModel])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
