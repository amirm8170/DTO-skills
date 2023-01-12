import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';
import { updateTaskStatusDto } from './DTO/update-task-status.dto';
import { filterDto } from './DTO/search-task.dto';
import { createTaskDto } from './DTO/create-task.dto';
import { TaskStatus } from './task-status.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}
  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
    return this.TasksService.createTask(createTaskDto);
  }
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Promise<Task> {
  //   return this.TasksService.getTaskById(id);
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): Promise<void> {
  //   return this.TasksService.deleteTaskById(id);
  // }
}
