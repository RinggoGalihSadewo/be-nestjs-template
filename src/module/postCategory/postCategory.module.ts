import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostCategoryController } from './postCategory.controller';
import { PostCategoryModel } from './postCategory.entity';
import { PostCategoryService } from './postCategory.service';

@Module({
  imports: [SequelizeModule.forFeature([PostCategoryModel])],
  controllers: [PostCategoryController],
  providers: [PostCategoryService],
  exports: [PostCategoryService],
})
export class PostCategoryModule {}
