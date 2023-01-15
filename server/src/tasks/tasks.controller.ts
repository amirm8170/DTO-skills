import { Users } from './../auth/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './task.entity';
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
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private TasksService: TasksService) {}
  @Post()
  createTask(
    @Body() createTaskDto: createTaskDto,
    @GetUser() user: Users,
  ): Promise<Task> {
    this.logger.verbose(
      `"${user.username}" has created ${JSON.stringify(createTaskDto)}`,
    );
    return this.TasksService.createTask(createTaskDto, user);
  }
  @Get()
  getTasks(
    @Query() filterDto: filterDto,
    @GetUser() user: Users,
  ): Promise<Task[]> {
    return this.TasksService.getTasks(filterDto, user);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string, user: Users): Promise<Task> {
    return this.TasksService.getTaskById(id, user);
  }
  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<void> {
    return this.TasksService.deleteTaskById(id, user);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
    @GetUser() user: Users,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.TasksService.updateTask(id, status, user);
  }
}
