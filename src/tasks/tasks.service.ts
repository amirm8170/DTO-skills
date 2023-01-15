import { Users } from './../auth/users.entity';
import { Task } from './task.entity';
import { TaskRepository } from './tasks-repository.entity';
import { filterDto } from './DTO/search-task.dto';
import { createTaskDto } from './DTO/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private TaskRepository: TaskRepository,
  ) {}
  async createTask(createTaskDto: createTaskDto, user: Users): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = this.TaskRepository.create({
      title,
      description,
      status: TaskStatus.DONE,
      user,
    });
    await this.TaskRepository.save(newTask);
    return newTask;
  }
  async getTasks(filterDto: filterDto, user: Users): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.TaskRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status=:status', { status });
      query.where({ user });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async getTaskById(id: string, user: Users): Promise<Task> {
    const findTask = await this.TaskRepository.findOne({ where: { user, id } });
    if (!findTask) {
      throw new NotFoundException();
    }
    return findTask;
  }
  async deleteTaskById(id: string, user: Users): Promise<void> {
    const result = await this.TaskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  async updateTask(id: string, status: TaskStatus, user: Users): Promise<Task> {
    const findTask = await this.getTaskById(id, user);
    findTask.status = status;
    await this.TaskRepository.save(findTask);
    return findTask;
  }
}
