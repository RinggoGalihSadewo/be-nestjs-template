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
  PostUpdateRequest,
  PostUpdateResponse,
  PostCreateRequest,
  PostFindAllResponse,
  PostFindOneRequest,
  PostFindOneResponse,
  PostDeleteResponse,
  PostCreateResponse,
} from './post.contract';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'FIND ALL POST' })
  async findAll(): Promise<PostFindAllResponse> {
    try {
      Logger.log('--START FIND ALL POST, POST CONTROLLER--');

      return await this.postService.findAll();
    } catch (error) {
      Logger.error('--FIND ALL ERROR--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'FIND ONE POST' })
  async findOne(@Param('id') id: string): Promise<PostFindOneResponse> {
    try {
      Logger.log('--START FIND ONE POST, POST CONTROLLER--');
      return await this.postService.findOne(id);
    } catch (error) {
      Logger.error('--FIND ONE ERROR: POST CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'POST POST' })
  async create(@Body() params: PostCreateRequest): Promise<PostCreateResponse> {
    try {
      Logger.log('--START POST POST, POST CONTROLLER--');

      return await this.postService.create(params);
    } catch (error) {
      Logger.error('--POST ERROR: POST CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'UPDATE POST' })
  async update(
    @Param('id') id: string,
    @Body() params: PostUpdateRequest,
  ): Promise<PostUpdateResponse> {
    try {
      Logger.log('--START UPDATE POST, POST CONTROLLER--');

      return await this.postService.update(id, params);
    } catch (error) {
      Logger.error('--UPDATE ERROR: USERS CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'DELETE POST' })
  async remove(
    @Param('id') id: string,
  ): Promise<{ isSuccess: boolean; data: PostDeleteResponse }> {
    try {
      Logger.log('--START UPDATE POST, POST CONTROLLER--');
      return await this.postService.remove(id);
    } catch (error) {
      Logger.error('--DELETE ERROR: POST CONTROLLER--');
      Logger.error(error);
      throw new Error(`External service is unavailable: ${error}`);
    }
  }
}
