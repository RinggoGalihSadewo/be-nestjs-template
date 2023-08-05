import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UsersProperties } from './users.entity';

export abstract class UsersApiContract {
  abstract findAll(): Promise<UsersFindAllResponse>;
  abstract findOne(id: UsersFindOneRequest): Promise<UsersFindOneResponse>;
  abstract create(request: UsersCreateRequest): Promise<UsersCreateResponse>;
  abstract update(
    id: number,
    request: UsersUpdateRequest,
  ): Promise<UsersUpdateResponse>;
  abstract remove(id: number): Promise<UsersDeleteResponse>;
}

export class UsersFindAllResponse {
  readonly results: UsersProperties[];
}

export class UsersFindOneRequest {
  readonly id: number;
}

export class UsersFindOneResponse {
  readonly id: number;

  @ApiProperty({ example: 'your_name' })
  readonly name: string;

  @ApiProperty({ example: 'your_username@gmail.com' })
  readonly username: string;

  @ApiProperty({ example: 'your_email@gmail.com' })
  readonly email: string;

  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class UsersCreateRequest {
  @IsNotEmpty()
  @ApiProperty({ example: 'your_name' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'your_username' })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'your_email@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 'your_password' })
  @IsNotEmpty()
  readonly password: string;
}

export class UsersCreateResponse extends UsersFindOneResponse {}

export class UsersProfileRequest {
  readonly user: UsersFindOneResponse;
}

export class UsersProfileResponse extends UsersFindOneResponse {}

export class UsersUpdateRequest extends UsersFindOneResponse {}

export class UsersUpdateResponse extends UsersFindOneResponse {}

export class UsersDeleteResponse extends UsersFindOneResponse {}
