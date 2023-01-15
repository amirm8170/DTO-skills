import { AuthGuard } from '@nestjs/passport';
import { Task } from './task.entity';
import { TaskRepository } from './tasks-repository.entity';
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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private TasksService: TasksService) {}
  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
    return this.TasksService.createTask(createTaskDto);
  }
  @Get()
  getTasks(@Query() filterDto: filterDto): Promise<Task[]> {
    return this.TasksService.getTasks(filterDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.TasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.TasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.TasksService.updateTask(id, status);
  }
}
