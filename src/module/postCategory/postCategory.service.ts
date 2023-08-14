import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  PostCategoryCreateRequest,
  PostCategoryFindOneResponse,
  PostCategoryUpdateRequest,
  PostCategoryUpdateResponse,
  PostCategoryDeleteResponse,
  PostCategoryCreateResponse,
} from './postCategory.contract';
import {
  PostCategoryModel,
  PostCategoryProperties,
} from './postCategory.entity';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostCategoryService {
  constructor(
    @InjectModel(PostCategoryModel)
    private readonly postCategoryRepositories: typeof PostCategoryModel,
  ) {}

  async findAll(): Promise<{ results: PostCategoryProperties[] }> {
    try {
      Logger.log('--START FIND ALL POST CATEGORY, POST CATEGORY SERVICE--');

      const results = await this.postCategoryRepositories.findAll({
        order: [['createdAt', 'DESC']],
      });

      Logger.log(`Results: ${JSON.stringify(results)}`);

      return {
        results: results.map((value) => value.get()),
      };
    } catch (error) {
      Logger.error('--FIND ALL ERROR: POST CATEGORY SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async findOne(id: string): Promise<PostCategoryFindOneResponse> {
    try {
      Logger.log('--START FIND ONE POST CATEGORY, POST CATEGORY SERVICE--');

      const result = await this.postCategoryRepositories.findOne({
        where: { id },
      });

      if (result) {
        Logger.log(`Result: ${JSON.stringify(result)}`);
        return result;
      } else {
        Logger.error(
          `--POST CATEGORY ID: ${id} NOT FOUND, POST CATEGORY SERVICE--`,
        );

        return Promise.reject({
          message: `postCategory Id: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--FIND ONE ERROR: POST CATEGORY SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async create(
    params: PostCategoryCreateRequest,
  ): Promise<PostCategoryCreateResponse> {
    try {
      Logger.log('--POST POST CATEGORY, POST CATEGORY SERVICE--');

      const result = await this.postCategoryRepositories.create({
        ...params,
        id: uuidv4(),
        slug: slugify(`${params.slug}`, '-'),
      });

      Logger.log(`Result: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      Logger.error('--POST ERROR: POST CATEGORY SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async update(
    id: string,
    params: PostCategoryUpdateRequest,
  ): Promise<PostCategoryUpdateResponse> {
    try {
      const result = await this.postCategoryRepositories.findOne({
        where: { id },
      });

      if (result) {
        await this.postCategoryRepositories.update(
          {
            ...params,
            slug: slugify(`${params.slug}`, '-'),
          },
          {
            where: { id },
          },
        );

        const result = await this.postCategoryRepositories.findOne({
          where: { id },
        });

        Logger.log(`Result: ${JSON.stringify(result)}`);

        return result;
      } else {
        Logger.error(
          `--POST CATEGORY ID: ${id} NOT FOUND, POST CATEGORY SERVICE--`,
        );

        return Promise.reject({
          message: `postCategory Id: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--UPDATE ERROR: POST CATEGORY SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async remove(
    id: string,
  ): Promise<{ isSuccess: boolean; data: PostCategoryDeleteResponse }> {
    try {
      const result = await this.postCategoryRepositories.findOne({
        where: { id },
      });
      if (result) {
        await this.postCategoryRepositories.destroy({
          where: { id },
        });

        Logger.log(`Result: ${JSON.stringify(result)}`);

        return {
          isSuccess: true,
          data: result,
        };
      } else {
        Logger.error(
          `--POST CATEGORY ID: ${id} NOT FOUND, POST CATEGORY SERVICE--`,
        );

        return Promise.reject({
          message: `postCategory Id: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--DELETE ERROR: POST CATEGORY SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }
}
