import { NotFoundException, Injectable, Inject } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { createTaskDto } from './DTO/create-task.dto';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TaskRepository {
  constructor(
    @Inject('Users')
    private Users: Repository<Task>,
  ) {}

  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const newUser = this.Users.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.Users.save(newUser);
    return newUser;
  }

  // async createTask(createTaskDto: createTaskDto): Promise<Task> {
  //   const { title, description } = createTaskDto;
  //   const newTask = this.create({
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   });
  //   await this.save(newTask);
  //   return newTask;
  // }
  // async deleteTaskById(id: string): Promise<void> {
  //   const result = await this.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`task with this id ${id} not found!`);
  //   }
  // }
}
