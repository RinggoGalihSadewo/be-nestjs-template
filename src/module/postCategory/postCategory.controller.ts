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
  PostCategoryUpdateRequest,
  PostCategoryUpdateResponse,
  PostCategoryCreateRequest,
  PostCategoryFindAllResponse,
  PostCategoryFindOneRequest,
  PostCategoryFindOneResponse,
  PostCategoryDeleteResponse,
  PostCategoryCreateResponse,
} from './postCategory.contract';
import { PostCategoryService } from './postCategory.service';

@Controller('post-category')
@ApiTags('Post Category')
export class PostCategoryController {
  constructor(private readonly postCategoryService: PostCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'FIND ALL POST CATEGORY' })
  async findAll(): Promise<PostCategoryFindAllResponse> {
    try {
      Logger.log('--START FIND ALL POST CATEGORY, POST CATEGORY CONTROLLER--');

      return await this.postCategoryService.findAll();
    } catch (error) {
      Logger.error('--FIND ALL ERROR--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'FIND ONE POST CATEGORY' })
  async findOne(@Param('id') id: string): Promise<PostCategoryFindOneResponse> {
    try {
      Logger.log('--START FIND ONE POST CATEGORY, POST CATEGORY CONTROLLER--');
      return await this.postCategoryService.findOne(id);
    } catch (error) {
      Logger.error('--FIND ONE ERROR: POST CATEGORY CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'POST POST CATEGORY' })
  async create(
    @Body() params: PostCategoryCreateRequest,
  ): Promise<PostCategoryCreateResponse> {
    try {
      Logger.log('--START POST POST CATEGORY, POST CATEGORY CONTROLLER--');

      return await this.postCategoryService.create(params);
    } catch (error) {
      Logger.error('--POST ERROR: POST CATEGORY CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'UPDATE POST CATEGORY' })
  async update(
    @Param('id') id: string,
    @Body() params: PostCategoryUpdateRequest,
  ): Promise<PostCategoryUpdateResponse> {
    try {
      Logger.log('--START UPDATE POST CATEGORY, POST CATEGORY CONTROLLER--');

      return await this.postCategoryService.update(id, params);
    } catch (error) {
      Logger.error('--UPDATE ERROR: USERS CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'DELETE POST CATEGORY' })
  async remove(
    @Param('id') id: string,
  ): Promise<{ isSuccess: boolean; data: PostCategoryDeleteResponse }> {
    try {
      Logger.log('--START UPDATE POST CATEGORY, POST CATEGORY CONTROLLER--');
      return await this.postCategoryService.remove(id);
    } catch (error) {
      Logger.error('--DELETE ERROR: POST CATEGORY CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }
}
