import { updateTaskStatusDto } from './DTO/update-task-status.dto';
import { filterDto } from './DTO/search-task.dto';
import { createTaskDto } from './DTO/create-task.dto';
import { Task, TaskStatus } from './task.model';
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
  @Get()
  getAllTasks() {
    return this.TasksService.getAllTasks();
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.TasksService.getTaskById(id);
  }
  @Get()
  searchTaskDto(@Query() filterDto: filterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.TasksService.searchTaskDto(filterDto);
    } else {
      return this.TasksService.getAllTasks();
    }
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): string {
    this.TasksService.deleteTaskById(id);
    return 'deleted';
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.TasksService.updateTaskById(id, status);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.TasksService.createTask(createTaskDto);
  }
}
