import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UsersProperties } from '../users/users.entity';

export abstract class AuthApiContract {
  abstract signup(request: AuthSignUpResponse): Promise<UsersProperties>;
  abstract signin(request: AuthSignInRequest): Promise<AuthSignInResponse>;
}

export class AuthSignInRequest {
  @ApiProperty({ example: 'ringgo@gmail.com' })
  readonly email: string;

  readonly username: string;

  @ApiProperty({ example: 'ringgo' })
  @IsNotEmpty()
  readonly password: string;
}

export class AuthSignInResponse {
  access_token?: string;
  message: string;
}

export class AuthSignUpResponse {
  @ApiProperty({ example: 'your_name' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'your_email' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'your_username' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'your_password' })
  @IsNotEmpty()
  readonly password: string;
}
