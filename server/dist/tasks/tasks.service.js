"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const task_entity_1 = require("./task.entity");
const tasks_repository_entity_1 = require("./tasks-repository.entity");
const task_status_enum_1 = require("./task-status.enum");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let TasksService = class TasksService {
    constructor(TaskRepository) {
        this.TaskRepository = TaskRepository;
    }
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const newTask = this.TaskRepository.create({
            title,
            description,
            status: task_status_enum_1.TaskStatus.DONE,
            user,
        });
        await this.TaskRepository.save(newTask);
        return newTask;
    }
    async getTasks(filterDto, user) {
        const { status, search } = filterDto;
        const query = this.TaskRepository.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status=:status', { status });
            query.where({ user });
        }
        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', {
                search: `%${search}%`,
            });
        }
        const tasks = await query.getMany();
        return tasks;
    }
    async getTaskById(id, user) {
        const findTask = await this.TaskRepository.findOne({ where: { user, id } });
        if (!findTask) {
            throw new common_1.NotFoundException();
        }
        return findTask;
    }
    async deleteTaskById(id, user) {
        const result = await this.TaskRepository.delete({ id, user });
        if (result.affected === 0) {
            throw new common_1.NotFoundException();
        }
    }
    async updateTask(id, status, user) {
        const findTask = await this.getTaskById(id, user);
        findTask.status = status;
        await this.TaskRepository.save(findTask);
        return findTask;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [tasks_repository_entity_1.TaskRepository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map