import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepository extends Repository<Task> {}
