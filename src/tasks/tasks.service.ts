import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

import { StatusHttp } from 'src/types';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private TaskRepository: typeof Task) {}
  async createTask(dto: CreateTaskDto) {
    return await this.TaskRepository.create(dto);
  }

  async getAllTasks() {
    return await this.TaskRepository.findAll({ order: [['id', 'ASC']] });
  }

  async updateTask(id: number, dto) {
    const [index, [task]] = await this.TaskRepository.update(dto, {
      where: { id },
      returning: true,
    });
    if (!index) throw new NotFoundException('tasks not found');
    return task;
  }

  async deleteAllCompleted(): Promise<StatusHttp> {
    const tasks = await this.TaskRepository.destroy({
      where: { isChecked: true },
    });
    if (!tasks) throw new BadRequestException('No completed tasks');
    return {
      status: HttpStatus,
      message: 'Ok',
    };
  }

  async deleteCurrentTask(id: number): Promise<StatusHttp> {
    const task = await this.TaskRepository.destroy({
      where: { id },
    });
    if (!task) throw new BadRequestException('find not task');
    return {
      status: HttpStatus,
      message: 'Task delete',
    };
  }

  async checkAllTasks(status: boolean): Promise<StatusHttp> {
    const [result] = await this.TaskRepository.update(
      { isChecked: status },
      { where: { isChecked: !status } },
    );
    if (!result) throw new BadRequestException(`Not find no completed tasks`);
    return {
      status: HttpStatus,
      message: 'Ok',
    };
  }
}
