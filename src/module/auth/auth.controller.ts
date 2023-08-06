import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersProperties } from '../users/users.entity';
import {
  AuthSignInRequest,
  AuthSignInResponse,
  AuthSignUpResponse,
} from './auth.contract';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'SIGN UP AUTH' })
  async signup(@Body() params: AuthSignUpResponse): Promise<UsersProperties> {
    try {
      Logger.log('--START FIND ONE USERS, USERS CONTROLLER--');
      return await this.authService.signup(params);
    } catch (error) {
      Logger.error('--LOGIN ERROR: USERS CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @Post('signin')
  @ApiOperation({ summary: 'SIGN IN AUTH' })
  async signin(@Body() params: AuthSignInRequest): Promise<AuthSignInResponse> {
    try {
      Logger.log('--START LOGIN, USERS CONTROLLER--');
      return await this.authService.signin(params);
    } catch (error) {
      Logger.error('--LOGIN ERROR: USERS CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }
}
