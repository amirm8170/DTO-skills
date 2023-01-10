import { filterDto } from './DTO/search-task.dto';
import { createTaskDto } from './DTO/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const findTask = this.tasks.find((task) => task.id === id);
    if (!findTask) {
      throw new NotFoundException(`task with this id ${id} not found!`);
    }
    return findTask;
  }

  deleteTaskById(id: string): void {
    const findTask: Task = this.tasks.find((task) => task.id === id);
    if (!findTask) {
      throw new NotFoundException(`task with this id ${id} not found!`);
    } else {
      const findIndex: number = this.tasks.indexOf(findTask);
      this.tasks.splice(findIndex, 1);
    }
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    const findTask = this.getTaskById(id);
    findTask.status = status;
    return findTask;
  }

  searchTaskDto(filterDto: filterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
