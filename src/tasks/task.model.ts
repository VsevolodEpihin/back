import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CreateTask {
  textTask: string;
  isChecked: boolean;
}

@Table
export class Task extends Model<Task, CreateTask> {
  // @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  // @Column({
  //   type: DataType.INTEGER,
  //   unique: true,
  //   autoIncrement: true,
  //   primaryKey: true,
  // })
  // id: number;

  @ApiProperty({ example: 'text todo', description: 'Текст задачи' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  textTask: string;

  @ApiProperty({
    example: true,
    description: 'выполнена или не выполнена задача',
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  isChecked: boolean;
}
