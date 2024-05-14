import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [SequelizeModule.forFeature([Task])],
})
export class TasksModule {}
