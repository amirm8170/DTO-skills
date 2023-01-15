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
exports.TasksController = void 0;
const users_entity_1 = require("./../auth/users.entity");
const passport_1 = require("@nestjs/passport");
const update_task_status_dto_1 = require("./DTO/update-task-status.dto");
const search_task_dto_1 = require("./DTO/search-task.dto");
const create_task_dto_1 = require("./DTO/create-task.dto");
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let TasksController = class TasksController {
    constructor(TasksService) {
        this.TasksService = TasksService;
        this.logger = new common_1.Logger('TasksController');
    }
    createTask(createTaskDto, user) {
        this.logger.verbose(`"${user.username}" has created ${JSON.stringify(createTaskDto)}`);
        return this.TasksService.createTask(createTaskDto, user);
    }
    getTasks(filterDto, user) {
        return this.TasksService.getTasks(filterDto, user);
    }
    getTaskById(id, user) {
        return this.TasksService.getTaskById(id, user);
    }
    deleteTaskById(id, user) {
        return this.TasksService.deleteTaskById(id, user);
    }
    updateTask(id, updateTaskStatusDto, user) {
        const { status } = updateTaskStatusDto;
        return this.TasksService.updateTask(id, status, user);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.createTaskDto,
        users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_task_dto_1.filterDto,
        users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTaskById", null);
__decorate([
    (0, common_1.Patch)('/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_status_dto_1.updateTaskStatusDto,
        users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map