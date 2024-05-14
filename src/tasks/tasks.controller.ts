import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Param } from '@nestjs/common';
import { StatusHttp } from 'src/type';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from './task.model';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @ApiOperation({ summary: 'создание задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Post()
  async create(@Body() taskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(taskDto);
  }

  @ApiOperation({ summary: 'Получение всех задач' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  async getAll(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @ApiOperation({ summary: 'удаление задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Delete('completed')
  async deleteAllCompleted(): Promise<StatusHttp> {
    return await this.tasksService.deleteAllCompleted();
  }

  @ApiOperation({ summary: 'удаление задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.deleteCurrentTask(id);
  }

  @ApiOperation({ summary: 'изменение задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Patch(':id')
  async updateOneTask(
    @Param('id', ParseIntPipe) _id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.tasksService.updateTask(_id, updateTaskDto);
  }
}
