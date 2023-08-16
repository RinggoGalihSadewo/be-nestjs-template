import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostController } from './post.controller';
import { PostModel } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [SequelizeModule.forFeature([PostModel])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
