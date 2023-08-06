import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  RoleCreateRequest,
  RoleFindOneResponse,
  RoleUpdateRequest,
  RoleUpdateResponse,
  RoleDeleteResponse,
  RoleCreateResponse,
} from './role.contract';
import { RoleModel, RoleProperties } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private readonly roleRepositories: typeof RoleModel,
  ) {}

  async findAll(): Promise<{ results: RoleProperties[] }> {
    try {
      Logger.log('--START FIND ALL ROLE, ROLE SERVICE--');

      const results = await this.roleRepositories.findAll({
        order: [['createdAt', 'ASC']],
      });

      Logger.log(`Results: ${JSON.stringify(results)}`);

      return {
        results: results.map((value) => value.get()),
      };
    } catch (error) {
      Logger.error('--FIND ALL ERROR: ROLE SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async findOne(id: number): Promise<RoleFindOneResponse> {
    try {
      Logger.log('--START FIND ONE ROLE, ROLE SERVICE--');

      const result = await this.roleRepositories.findOne({
        where: { id },
      });

      if (result) {
        Logger.log(`Result: ${JSON.stringify(result)}`);
        return result;
      } else {
        Logger.error(`--ID ROLE: ${id} NOT FOUND, ROLE SERVICE--`);

        return Promise.reject({
          message: `Id Role: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--FIND ONE ERROR: ROLE SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async create(params: RoleCreateRequest): Promise<RoleCreateResponse> {
    try {
      Logger.log('--POST ROLE, ROLE SERVICE--');

      const result = await this.roleRepositories.create({
        ...params,
      });

      Logger.log(`Result: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      Logger.error('--POST ERROR: ROLE SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async update(
    id: number,
    params: RoleUpdateRequest,
  ): Promise<RoleUpdateResponse> {
    try {
      const result = await this.roleRepositories.findOne({
        where: { id },
      });

      if (result) {
        await this.roleRepositories.update(
          {
            ...params,
          },
          {
            where: { id },
          },
        );

        const role = await this.roleRepositories.findOne({
          where: { id },
        });

        Logger.log(`Result: ${JSON.stringify(role)}`);

        return role;
      } else {
        Logger.error(`--ID ROLE: ${id} NOT FOUND, ROLE SERVICE--`);

        return Promise.reject({
          message: `Id Role: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--UPDATE ERROR: ROLE SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async remove(
    id: number,
  ): Promise<{ isSuccess: boolean; data: RoleDeleteResponse }> {
    try {
      const result = await this.findOne(id);
      if (result) {
        await this.roleRepositories.destroy({
          where: { id },
        });

        Logger.log(`Result: ${JSON.stringify(result)}`);

        return {
          isSuccess: true,
          data: result,
        };
      } else {
        Logger.error(`--ID ROLE: ${id} NOT FOUND, ROLE SERVICE--`);

        return Promise.reject({
          message: `Id Role: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--DELETE ERROR: ROLE SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }
}
