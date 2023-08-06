import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import {
  RoleUpdateRequest,
  RoleUpdateResponse,
  RoleCreateRequest,
  RoleFindAllResponse,
  RoleFindOneRequest,
  RoleFindOneResponse,
  RoleDeleteResponse,
  RoleCreateResponse,
} from './role.contract';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'FIND ALL ROLE' })
  async findAll(): Promise<RoleFindAllResponse> {
    try {
      Logger.log('--START FIND ALL ROLE, ROLE CONTROLLER--');

      return await this.roleService.findAll();
    } catch (error) {
      Logger.error('--FIND ALL ERROR--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'FIND ONE ROLE' })
  async findOne(
    @Param() params: RoleFindOneRequest,
  ): Promise<RoleFindOneResponse> {
    try {
      Logger.log('--START FIND ONE ROLE, ROLE CONTROLLER--');
      return await this.roleService.findOne(params.id);
    } catch (error) {
      Logger.error('--FIND ONE ERROR: ROLE CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'POST ROLE' })
  async create(@Body() params: RoleCreateRequest): Promise<RoleCreateResponse> {
    try {
      Logger.log('--START POST ROLE, ROLE CONTROLLER--');

      return await this.roleService.create(params);
    } catch (error) {
      Logger.error('--POST ERROR: ROLE CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'UPDATE ROLE' })
  async update(
    @Param('id') id: number,
    @Body() params: RoleUpdateRequest,
  ): Promise<RoleUpdateResponse> {
    try {
      Logger.log('--START UPDATE ROLE, ROLE CONTROLLER--');

      return await this.roleService.update(id, params);
    } catch (error) {
      Logger.error('--UPDATE ERROR: ROLE CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'DELETE ROLE' })
  async remove(
    @Param('id') id: number,
  ): Promise<{ isSuccess: boolean; data: RoleDeleteResponse }> {
    try {
      Logger.log('--START UPDATE ROLE, ROLE CONTROLLER--');
      return await this.roleService.remove(id);
    } catch (error) {
      Logger.error('--DELETE ERROR: ROLE CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }
}
