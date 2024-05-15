import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
  @ApiProperty({
    example: 'text todo',
    description: 'Текст задачи',
  })
  @Column({
    allowNull: false,
  })
  text: string;

  @ApiProperty({
    example: true,
    description: 'выполнена или не выполнена задача',
  })
  @Column({
    defaultValue: false,
  })
  isChecked: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
