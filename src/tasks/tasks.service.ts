import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';
import { filterDto } from './DTO/search-task.dto';
import { createTaskDto } from './DTO/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private TaskRepository: TaskRepository,
  ) {}
  createTask(createTaskDto: createTaskDto): Promise<Task> {
    return this.TaskRepository.createTask(createTaskDto);
  }
  // async getTaskById(id: string): Promise<Task> {
  //   const findTask = await this.TaskRepository.findOneBy({ id });

  //   if (!findTask) {
  //     throw new NotFoundException(`task with this id ${id} not found!`);
  //   }
  //   return findTask;
  // }

  // deleteTaskById(id: string): Promise<void> {
  //   return this.TaskRepository.deleteTaskById(id);
  // }
}
