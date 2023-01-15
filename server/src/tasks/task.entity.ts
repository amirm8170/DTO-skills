import { Users } from './../auth/users.entity';
import { TaskStatus } from './task-status.enum';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Table,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => Users, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: Users;
}
