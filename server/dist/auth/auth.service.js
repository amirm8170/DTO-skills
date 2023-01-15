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
exports.AuthService = void 0;
const users_entity_1 = require("./users.entity");
const users_repository_entity_1 = require("./users-repository.entity");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(UserRepository, jwtService) {
        this.UserRepository = UserRepository;
        this.jwtService = jwtService;
    }
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = this.UserRepository.create({
            username,
            password: hashPassword,
        });
        try {
            await this.UserRepository.save(newUser);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('username is already exist!');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async signIn(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.UserRepository.findOneBy({ username });
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        if (user && (await bcrypt.compare(password, user.password))) {
            return { accessToken };
        }
        else {
            throw new common_1.UnauthorizedException('invalid login credentials.');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [users_repository_entity_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map