import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PostCategoryProperties } from './postCategory.entity';

export abstract class PostCategoryApiContract {
  abstract findAll(): Promise<PostCategoryFindAllResponse>;
  abstract findOne(
    id: PostCategoryFindOneRequest,
  ): Promise<PostCategoryFindOneResponse>;
  abstract create(
    request: PostCategoryCreateRequest,
  ): Promise<PostCategoryCreateResponse>;
  abstract update(
    id: string,
    request: PostCategoryUpdateRequest,
  ): Promise<PostCategoryUpdateResponse>;
  abstract remove(id: string): Promise<PostCategoryDeleteResponse>;
}

export class PostCategoryFindAllResponse {
  readonly results: PostCategoryProperties[];
}

export class PostCategoryFindOneRequest {
  readonly id: string;
}

export class PostCategoryFindOneResponse {
  readonly id: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'sports' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'sports' })
  readonly slug: string;

  @IsOptional()
  @ApiProperty({ example: 'your_description' })
  readonly description?: string;
}

export class PostCategoryCreateRequest {
  @IsNotEmpty()
  @ApiProperty({ example: 'sports' })
  readonly name: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'sports' })
  readonly slug: string;

  @IsOptional()
  @ApiProperty({ example: 'your_description' })
  readonly description?: string;
}

export class PostCategoryCreateResponse extends PostCategoryFindOneResponse {}

export class PostCategoryUpdateRequest extends PostCategoryFindOneResponse {}

export class PostCategoryUpdateResponse extends PostCategoryFindOneResponse {}

export class PostCategoryDeleteResponse extends PostCategoryFindOneResponse {}
