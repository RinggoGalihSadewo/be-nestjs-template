import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PostCategoryModel } from '../postCategory/postCategory.entity';

export type PostProperties = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  type: string;
  body?: string;
  isMain: boolean;
  isPublish: boolean;
  author: string;
  coverImage: string;
  video?: string;
  createdAt: Date;
  updatedAt: Date;
};

enum PostType {
  NEWS = 'NEWS',
  ARTICLES = 'ARTICLES',
  ANNOUNCEMENTS = 'ANNOUNCEMENTS',
}

@Table({
  tableName: 'post',
  timestamps: true,
})
export class PostModel extends Model {
  @PrimaryKey
  @Column
  @IsNotEmpty()
  id: string;

  @Column
  @IsNotEmpty()
  title: string;

  @Column
  @IsNotEmpty()
  slug: string;

  @ForeignKey(() => PostCategoryModel)
  @Column
  @IsNotEmpty()
  categoryId: string;

  @Column
  @IsNotEmpty()
  type: PostType;

  @Column
  @IsOptional()
  body?: string;

  @Column
  @IsNotEmpty()
  isMain: boolean;

  @Column
  @IsNotEmpty()
  isPublish: boolean;

  @Column
  @IsNotEmpty()
  author: string;

  @Column
  @IsNotEmpty()
  coverImage: string;

  @Column
  @IsOptional()
  video?: string;

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

  @BelongsTo(() => PostCategoryModel)
  category: PostCategoryModel;
}
