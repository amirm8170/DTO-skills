import { Users } from './../auth/users.entity';
import { Task } from './task.entity';
import { TaskRepository } from './tasks-repository.entity';
import { filterDto } from './DTO/search-task.dto';
import { createTaskDto } from './DTO/create-task.dto';
import { TaskStatus } from './task-status.enum';
export declare class TasksService {
    private TaskRepository;
    constructor(TaskRepository: TaskRepository);
    createTask(createTaskDto: createTaskDto, user: Users): Promise<Task>;
    getTasks(filterDto: filterDto, user: Users): Promise<Task[]>;
    getTaskById(id: string, user: Users): Promise<Task>;
    deleteTaskById(id: string, user: Users): Promise<void>;
    updateTask(id: string, status: TaskStatus, user: Users): Promise<Task>;
}
