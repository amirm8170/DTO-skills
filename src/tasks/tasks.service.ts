import { Task } from './task.entity';
import { TaskRepository } from './tasks-repository.entity';
import { filterDto } from './DTO/search-task.dto';
import { createTaskDto } from './DTO/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException, Render } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private TaskRepository: TaskRepository,
  ) {}
  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = this.TaskRepository.create({
      title,
      description,
      status: TaskStatus.DONE,
    });
    await this.TaskRepository.save(newTask);
    return newTask;
  }
  async getAllTasks(): Promise<Task[]> {
    return await this.TaskRepository.find();
  }
  async getTaskById(id: string): Promise<Task> {
    const findTask = await this.TaskRepository.findOneBy({ id });
    if (!findTask) {
      throw new NotFoundException();
    }
    return findTask;
  }
  async deleteTaskById(id: string): Promise<void> {
    const result = await this.TaskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const findTask = await this.getTaskById(id);
    findTask.status = status;
    await this.TaskRepository.save(findTask);
    return findTask;
  }
}
