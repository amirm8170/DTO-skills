import { Users } from './../auth/users.entity';
import { TaskStatus } from './task-status.enum';
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user: Users;
}
