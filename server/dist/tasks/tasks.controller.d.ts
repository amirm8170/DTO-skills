import { Users } from './../auth/users.entity';
import { Task } from './task.entity';
import { updateTaskStatusDto } from './DTO/update-task-status.dto';
import { filterDto } from './DTO/search-task.dto';
import { createTaskDto } from './DTO/create-task.dto';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private TasksService;
    private logger;
    constructor(TasksService: TasksService);
    createTask(createTaskDto: createTaskDto, user: Users): Promise<Task>;
    getTasks(filterDto: filterDto, user: Users): Promise<Task[]>;
    getTaskById(id: string, user: Users): Promise<Task>;
    deleteTaskById(id: string, user: Users): Promise<void>;
    updateTask(id: string, updateTaskStatusDto: updateTaskStatusDto, user: Users): Promise<Task>;
}
