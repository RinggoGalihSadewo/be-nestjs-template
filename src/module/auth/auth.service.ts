import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel, UsersProperties } from '../users/users.entity';
import {
  AuthSignInRequest,
  AuthSignInResponse,
  AuthSignUpResponse,
} from './auth.contract';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UsersModel)
    private readonly usersRepositories: typeof UsersModel,
    private readonly jwtService: JwtService,
  ) {}

  async signup(params: AuthSignUpResponse): Promise<UsersProperties> {
    try {
      Logger.log('--START SIGN UP USERS, USERS SERVICE--');

      const { name, username, email, password } = params;
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await this.usersRepositories.create({
        name,
        username,
        email,
        password: hashedPassword,
      });

      Logger.log(`Result: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      Logger.error('--SIGN UP ERROR: USERS SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async signin(params: AuthSignInRequest): Promise<AuthSignInResponse> {
    try {
      Logger.log('--START LOGIN USERS, USERS SERVICE--');

      let user: UsersProperties;
      const { email, username, password } = params;

      if (!email) {
        const result = await this.usersRepositories.findOne({
          where: { username: username },
        });

        if (!result) {
          Logger.log(`Cannot find username: ${username}`);
          return {
            message: 'Cannot find username',
          };
        }

        user = result;
      }

      if (!username) {
        const result = await this.usersRepositories.findOne({
          where: { email: email },
        });

        if (!result) {
          Logger.log(`Cannot find email: ${email}`);
          return {
            message: 'Cannot find email',
          };
        }

        user = result;
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        Logger.log(JSON.stringify(user));

        const access_token = await this.createAccessToken(user);

        return {
          access_token,
          message: 'success',
        };
      } else {
        Logger.log('Wrong Password');
        return {
          message: 'Wrong Password',
        };
      }
    } catch (error) {
      Logger.error('--LOGIN ERROR: USERS SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  async createAccessToken(user: UsersProperties): Promise<any> {
    try {
      Logger.log('--START CREATE ACCESS TOKEN USER, USERS SERVICE--');
      const payload = {
        sub: user.id,
      };
      const access_token = await this.jwtService.signAsync(payload);

      return access_token;
    } catch (error) {
      Logger.error('--CREATE ACCESS TOKEN ERROR: USERS SERVICE--');
      Logger.error(error);
      return Promise.reject(error);
    }
  }
}
