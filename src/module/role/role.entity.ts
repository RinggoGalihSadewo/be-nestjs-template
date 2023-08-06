import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UsersModel } from '../users/users.entity';

export type RoleProperties = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

@Table({
  tableName: 'role',
  timestamps: true,
})
export class RoleModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Column
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  @IsNotEmpty()
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  @IsNotEmpty()
  updatedAt: Date;

  @HasMany(() => UsersModel)
  users: UsersModel[];
}
