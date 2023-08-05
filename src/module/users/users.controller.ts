import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { multerConfig } from 'src/config/multer.config';
import { JwtAuthGuard } from '../auth/auth.guard';
import {
  UsersUpdateRequest,
  UsersUpdateResponse,
  UsersCreateRequest,
  UsersFindAllResponse,
  UsersFindOneRequest,
  UsersFindOneResponse,
  UsersDeleteResponse,
  UsersCreateResponse,
  UsersProfileRequest,
  UsersProfileResponse,
} from './users.contract';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'FIND ALL USERS' })
  async findAll(): Promise<UsersFindAllResponse> {
    try {
      Logger.log('--START FIND ALL USERS, USERS CONTROLLER--');

      return await this.usersService.findAll();
    } catch (error) {
      Logger.error('--FIND ALL ERROR--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'PROFILE USERS' })
  @Get('profile')
  async profile(
    @Request() req: UsersProfileRequest,
  ): Promise<UsersProfileResponse> {
    try {
      Logger.log('--START PROFILE USERS, USERS CONTROLLER--');
      return await this.usersService.profile(req);
    } catch (error) {
      Logger.error('--PROFILE ERROR: USERS CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'FIND ONE USERS' })
  async findOne(
    @Param() params: UsersFindOneRequest,
  ): Promise<UsersFindOneResponse> {
    try {
      Logger.log('--START FIND ONE USERS, USERS CONTROLLER--');
      return await this.usersService.findOne(params.id);
    } catch (error) {
      Logger.error('--FIND ONE ERROR: USERS CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'POST USERS' })
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async create(
    @Body() params: UsersCreateRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UsersCreateResponse> {
    try {
      Logger.log('--START POST USERS, USERS CONTROLLER--');

      if (file) {
        params.photo = file.filename;
      }

      return await this.usersService.create(params);
    } catch (error) {
      Logger.error('--POST ERROR: USERS CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'UPDATE USERS' })
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(
    @Param('id') id: number,
    @Body() params: UsersUpdateRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UsersUpdateResponse> {
    try {
      Logger.log('--START UPDATE USERS, USERS CONTROLLER--');

      if (file) {
        params.photo = file.filename;
      }

      return await this.usersService.update(id, params);
    } catch (error) {
      Logger.error('--UPDATE ERROR: USERS CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'DELETE USERS' })
  async remove(
    @Param('id') id: number,
  ): Promise<{ isSuccess: boolean; data: UsersDeleteResponse }> {
    try {
      Logger.log('--START UPDATE USERS, USERS CONTROLLER--');
      return await this.usersService.remove(id);
    } catch (error) {
      Logger.error('--DELETE ERROR: USERS CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }
}
