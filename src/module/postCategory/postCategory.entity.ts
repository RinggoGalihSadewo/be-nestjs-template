import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PostModel } from '../post/post.entity';

export type PostCategoryProperties = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

@Table({
  tableName: 'post_category',
  timestamps: true,
})
export class PostCategoryModel extends Model {
  @PrimaryKey
  @Column
  @IsNotEmpty()
  id: string;

  @Column
  @IsNotEmpty()
  name: string;

  @Column
  @IsNotEmpty()
  slug: string;

  @Column
  @IsOptional()
  description?: string;

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

  @HasMany(() => PostModel)
  post: PostModel[];
}
