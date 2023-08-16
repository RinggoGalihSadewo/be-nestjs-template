import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { PostProperties } from './post.entity';

export abstract class PostApiContract {
  abstract findAll(): Promise<PostFindAllResponse>;
  abstract findOne(id: PostFindOneRequest): Promise<PostFindOneResponse>;
  abstract create(request: PostCreateRequest): Promise<PostCreateResponse>;
  abstract update(
    id: string,
    request: PostUpdateRequest,
  ): Promise<PostUpdateResponse>;
  abstract remove(id: string): Promise<PostDeleteResponse>;
}

export class PostFindAllResponse {
  readonly results: PostProperties[];
}

export class PostFindOneRequest {
  readonly id: string;
}

export class PostFindOneResponse {
  readonly id: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'your_title' })
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'your_slug' })
  readonly slug: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  readonly categoryId: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'NEWS' })
  readonly type: string;

  @IsOptional()
  @ApiProperty({ example: 'your_body' })
  readonly body?: string;

  @IsNotEmpty()
  @ApiProperty({ example: true })
  readonly isMain: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: true })
  readonly isPublish: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  readonly author: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'default.png' })
  readonly coverImage: string;

  @IsOptional()
  @ApiProperty({ example: 'video.mp4' })
  readonly video?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class PostCreateRequest {
  @IsNotEmpty()
  @ApiProperty({ example: 'your_title' })
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'your_slug' })
  readonly slug: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  readonly categoryId: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'NEWS' })
  readonly type: string;

  @IsOptional()
  @ApiProperty({ example: 'your_body' })
  readonly body?: string;

  @IsNotEmpty()
  @ApiProperty({ example: true })
  readonly isMain: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: true })
  readonly isPublish: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  readonly author: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'default.png' })
  readonly coverImage: string;

  @IsOptional()
  @ApiProperty({ example: 'video.mp4' })
  readonly video?: string;
}

export class PostCreateResponse extends PostFindOneResponse {}

export class PostUpdateRequest extends PostFindOneResponse {}

export class PostUpdateResponse extends PostFindOneResponse {}

export class PostDeleteResponse extends PostFindOneResponse {}
