import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type UsersProperties = {
  id: number;
  role_id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
};

@Table({
  tableName: 'users',
  timestamps: true,
})
export class UsersModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Column
  @IsInt()
  @IsNotEmpty()
  role_id: number;

  @Column
  @IsString()
  name: string;

  @Column
  @IsString()
  username: string;

  @Column
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column
  @IsNotEmpty()
  password: string;

  @Column
  @IsNotEmpty()
  isActive: boolean;

  @Column({
    defaultValue: 'default.png',
  })
  photo: string;

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
}
