import { Task } from './task.entity';
import { taskRepository } from './tasks.repository';
import { filterDto } from './DTO/search-task.dto';
import { createTaskDto } from './DTO/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(taskRepository)
    private taskRepository: taskRepository,
  ) {}
  // getAllTasks() {
  //   return this.tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    const findTask = await this.taskRepository.findOneBy({ id });

    if (!findTask) {
      throw new NotFoundException(`task with this id ${id} not found!`);
    }
    return findTask;
  }
  // getTaskById(id: string): Task {
  //   const findTask = this.tasks.find((task) => task.id === id);
  //   if (!findTask) {
  //     throw new NotFoundException(`task with this id ${id} not found!`);
  //   }
  //   return findTask;
  // }
  // deleteTaskById(id: string): void {
  //   const findTask: Task = this.tasks.find((task) => task.id === id);
  //   if (!findTask) {
  //     throw new NotFoundException(`task with this id ${id} not found!`);
  //   } else {
  //     const findIndex: number = this.tasks.indexOf(findTask);
  //     this.tasks.splice(findIndex, 1);
  //   }
  // }
  // updateTaskById(id: string, status: TaskStatus): Task {
  //   const findTask = this.getTaskById(id);
  //   findTask.status = status;
  //   return findTask;
  // }
  // searchTaskDto(filterDto: filterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // createTask(createTaskDto: createTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
}
