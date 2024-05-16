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
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @ApiOperation({ summary: 'Получение всех задач' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @ApiOperation({ summary: 'удаление решенных задач' })
  @ApiResponse({ status: 200, type: Task })
  @Delete('completed')
  deleteAllCompleted() {
    return this.tasksService.deleteAllCompleted();
  }

  @ApiOperation({ summary: 'удаление задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Delete(':id')
  deleteOneTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteCurrentTask(id);
  }

  @ApiOperation({ summary: 'изменение задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Patch(':id')
  updateOneTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'отметить все задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Put()
  checkAllTasks(@Body('status') status: boolean) {
    return this.tasksService.checkAllTasks(status);
  }
}
