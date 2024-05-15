import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { StatusHttp } from 'src/types';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly taskRepository: typeof Task,
  ) {}

  createTask(dto: CreateTaskDto) {
    return this.taskRepository.create(dto);
  }

  getAllTasks() {
    return this.taskRepository.findAll({ order: [['id', 'ASC']] });
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    const [index, [task]] = await this.taskRepository.update(dto, {
      where: { id },
      returning: true,
    });
    if (index === 0) throw new NotFoundException('tasks not found');
    return task;
  }

  async deleteAllCompleted(): Promise<StatusHttp | never> {
    const tasks = await this.taskRepository.destroy({
      where: { isChecked: true },
    });
    if (tasks === 0) throw new BadRequestException('No completed tasks');
    return {
      status: HttpStatus,
      message: 'Ok',
    };
  }

  async deleteCurrentTask(id: number): Promise<StatusHttp | never> {
    const task = await this.taskRepository.destroy({
      where: { id },
    });
    if (task === 0) throw new BadRequestException('No found task');
    return {
      status: HttpStatus,
      message: 'Task delete',
    };
  }

  async checkAllTasks(status: boolean): Promise<StatusHttp | never> {
    const [result] = await this.taskRepository.update(
      { isChecked: status },
      { where: { isChecked: !status } },
    );
    if (result === 0)
      throw new BadRequestException(`Not find no completed tasks`);
    return {
      status: HttpStatus,
      message: 'Ok',
    };
  }
}
