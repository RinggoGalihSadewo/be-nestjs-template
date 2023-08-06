import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleProperties } from './role.entity';

export abstract class RoleApiContract {
  abstract findAll(): Promise<RoleFindAllResponse>;
  abstract findOne(id: RoleFindOneRequest): Promise<RoleFindOneResponse>;
  abstract create(request: RoleCreateRequest): Promise<RoleCreateResponse>;
  abstract update(
    id: number,
    request: RoleUpdateRequest,
  ): Promise<RoleUpdateResponse>;
  abstract remove(id: number): Promise<RoleDeleteResponse>;
}

export class RoleFindAllResponse {
  readonly results: RoleProperties[];
}

export class RoleFindOneRequest {
  readonly id: number;
}

export class RoleFindOneResponse {
  readonly id: number;

  @ApiProperty({ example: 'your_role' })
  readonly name: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class RoleCreateRequest {
  @IsNotEmpty()
  @ApiProperty({ example: 'your_role' })
  readonly name: string;
}

export class RoleCreateResponse extends RoleFindOneResponse {}

export class RoleProfileResponse extends RoleFindOneResponse {}

export class RoleUpdateRequest extends RoleFindOneResponse {}

export class RoleUpdateResponse extends RoleFindOneResponse {}

export class RoleDeleteResponse extends RoleFindOneResponse {}
