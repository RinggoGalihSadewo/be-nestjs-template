import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  PostCreateRequest,
  PostFindOneResponse,
  PostUpdateRequest,
  PostUpdateResponse,
  PostDeleteResponse,
  PostCreateResponse,
} from './post.contract';
import { PostModel, PostProperties } from './post.entity';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import { PostCategoryModel } from '../postCategory/postCategory.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel)
    private readonly postRepositories: typeof PostModel,
  ) {}

  async findAll(): Promise<{ results: PostProperties[] }> {
    try {
      Logger.log('--START FIND ALL POST, POST SERVICE--');

      const results = await this.postRepositories.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          isPublish: true,
        },
        include: [PostCategoryModel],
      });

      Logger.log(`Results: ${JSON.stringify(results)}`);

      return {
        results: results.map((value) => value.get()),
      };
    } catch (error) {
      Logger.error('--FIND ALL ERROR: POST SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async findOne(id: string): Promise<PostFindOneResponse> {
    try {
      Logger.log('--START FIND ONE POST, POST SERVICE--');

      const result = await this.postRepositories.findOne({
        order: [['createdAt', 'DESC']],
        where: {
          id,
          isPublish: true,
        },
        include: [PostCategoryModel],
      });

      if (result) {
        Logger.log(`Result: ${JSON.stringify(result)}`);
        return result;
      } else {
        Logger.error(`--POST ID: ${id} NOT FOUND, POST SERVICE--`);

        return Promise.reject({
          message: `post Id: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--FIND ONE ERROR: POST SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async create(params: PostCreateRequest): Promise<PostCreateResponse> {
    try {
      Logger.log('--POST POST, POST SERVICE--');

      const result = await this.postRepositories.create({
        ...params,
        id: uuidv4(),
        slug: slugify(`${params.slug}`, '-'),
      });

      Logger.log(`Result: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      Logger.error('--POST ERROR: POST SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async update(
    id: string,
    params: PostUpdateRequest,
  ): Promise<PostUpdateResponse> {
    try {
      const result = await this.postRepositories.findOne({
        where: { id },
      });

      if (result) {
        await this.postRepositories.update(
          {
            ...params,
            slug: slugify(`${params.slug}`, '-'),
          },
          {
            where: { id },
          },
        );

        const result = await this.postRepositories.findOne({
          where: {
            id,
            isPublish: true,
          },
          include: [PostCategoryModel],
        });

        Logger.log(`Result: ${JSON.stringify(result)}`);

        return result;
      } else {
        Logger.error(`--POST ID: ${id} NOT FOUND, POST SERVICE--`);

        return Promise.reject({
          message: `post Id: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--UPDATE ERROR: POST SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async remove(
    id: string,
  ): Promise<{ isSuccess: boolean; data: PostDeleteResponse }> {
    try {
      const result = await this.postRepositories.findOne({
        where: { id },
      });
      if (result) {
        await this.postRepositories.destroy({
          where: { id },
        });

        Logger.log(`Result: ${JSON.stringify(result)}`);

        return {
          isSuccess: true,
          data: result,
        };
      } else {
        Logger.error(`--POST ID: ${id} NOT FOUND, POST SERVICE--`);

        return Promise.reject({
          message: `post Id: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--DELETE ERROR: POST SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }
}
