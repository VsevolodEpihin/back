import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Param,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @ApiOperation({ summary: 'создание задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Post()
  async createTask(@Body() taskDto: CreateTaskDto) {
    return await this.tasksService.createTask(taskDto);
  }

  @ApiOperation({ summary: 'Получение всех задач' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  async getAllTasks() {
    return await this.tasksService.getAllTasks();
  }

  @ApiOperation({ summary: 'удаление решенных задач' })
  @ApiResponse({ status: 200, type: Task })
  @Delete('completed')
  async deleteAllCompleted() {
    return await this.tasksService.deleteAllCompleted();
  }

  @ApiOperation({ summary: 'удаление задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Delete(':id')
  async deleteOneTask(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.deleteCurrentTask(id);
  }

  @ApiOperation({ summary: 'изменение задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Patch(':id')
  async updateOneTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.tasksService.updateTask(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'отметить все задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Put()
  checkAllTasks(@Body('status') status: boolean) {
    return this.tasksService.checkAllTasks(status);
  }
}
