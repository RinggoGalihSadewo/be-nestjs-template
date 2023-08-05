import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  UsersCreateRequest,
  UsersFindOneResponse,
  UsersUpdateRequest,
  UsersUpdateResponse,
  UsersDeleteResponse,
  UsersCreateResponse,
  UsersProfileRequest,
  UsersProfileResponse,
} from './users.contract';
import { UsersModel, UsersProperties } from './users.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs/promises';
import { dirUsers } from 'src/config/multer.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel)
    private readonly usersRepositories: typeof UsersModel,
  ) {}

  async findAll(): Promise<{ results: UsersProperties[] }> {
    try {
      Logger.log('--START FIND ALL USERS, USERS SERVICE--');

      const results = await this.usersRepositories.findAll({
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['password'] },
      });

      Logger.log(`Results: ${JSON.stringify(results)}`);

      return {
        results: results.map((value) => value.get()),
      };
    } catch (error) {
      Logger.error('--FIND ALL ERROR: USERS SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async findOne(id: number): Promise<UsersFindOneResponse> {
    try {
      Logger.log('--START FIND ONE USERS, USERS SERVICE--');

      const result = await this.usersRepositories.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
      });

      if (result) {
        Logger.log(`Result: ${JSON.stringify(result)}`);
        return result;
      } else {
        Logger.error(`--ID USER: ${id} NOT FOUND, USERS SERVICE--`);

        return Promise.reject({
          message: `Id User: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--FIND ONE ERROR: USERS SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async profile(req: UsersProfileRequest): Promise<UsersProfileResponse> {
    try {
      Logger.log('--START PROFILE USERS, USERS SERVICE--');
      return req.user;
    } catch (error) {
      Logger.error('--PROFILE ERROR: USERS SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async create(params: UsersCreateRequest): Promise<UsersCreateResponse> {
    try {
      Logger.log('--POST USERS, USERS SERVICE--');

      const { password } = params;
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await this.usersRepositories.create({
        ...params,
        password: hashedPassword,
      });

      Logger.log(`Result: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      Logger.error('--POST ERROR: USERS SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async update(
    id: number,
    params: UsersUpdateRequest,
  ): Promise<UsersUpdateResponse> {
    try {
      const result = await this.usersRepositories.findOne({
        where: { id },
      });

      if (result) {
        if (result.photo && result.photo !== 'default.png') {
          const filePath = `${dirUsers}/${result.photo}`;

          try {
            Logger.log(`Delete photo users: ${result.photo}`);
            await fs.unlink(filePath);
          } catch (error) {
            Logger.error(
              `--DELETE PHOTO USERS: ${result.photo} ERROR, USERS SERVICE--`,
            );
            Promise.reject(error);
          }
        }

        await this.usersRepositories.update(
          {
            ...params,
          },
          {
            where: { id },
          },
        );

        const user = await this.usersRepositories.findOne({
          where: { id },
        });

        Logger.log(`Result: ${JSON.stringify(user)}`);

        return user;
      } else {
        Logger.error(`--ID USER: ${id} NOT FOUND, USERS SERVICE--`);

        return Promise.reject({
          message: `Id User: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--UPDATE ERROR: USERS SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async remove(
    id: number,
  ): Promise<{ isSuccess: boolean; data: UsersDeleteResponse }> {
    try {
      const result = await this.findOne(id);
      if (result) {
        if (result.photo && result.photo !== 'default.png') {
          const filePath = `${dirUsers}/${result.photo}`;

          try {
            Logger.log(`Delete photo users: ${result.photo}`);
            await fs.unlink(filePath);
          } catch (error) {
            Logger.error(
              `--DELETE PHOTO USERS: ${result.photo} ERROR, USERS SERVICE--`,
            );
            Promise.reject(error);
          }
        }

        await this.usersRepositories.destroy({
          where: { id },
        });

        Logger.log(`Result: ${JSON.stringify(result)}`);

        return {
          isSuccess: true,
          data: result,
        };
      } else {
        Logger.error(`--ID USER: ${id} NOT FOUND, USERS SERVICE--`);

        return Promise.reject({
          message: `Id User: ${id} not found`,
          code: HttpStatus.NOT_FOUND,
        });
      }
    } catch (error) {
      Logger.error('--DELETE ERROR: USERS SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }
}
