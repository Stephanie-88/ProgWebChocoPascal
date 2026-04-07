import { Body, Controller, Delete, Get, Param, Post, Patch, Put, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { DeactivateUserUseCase } from '../application/use-cases/deactivate-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { UserNotFoundException, EmailAlreadyInUseException } from '../domain/exceptions/user.exceptions';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly listUsersUseCase: ListUsersUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deactivateUserUseCase: DeactivateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Cria um usuário' })
    async create(@Body() dto: CreateUserDto) {
        try {
            return await this.createUserUseCase.execute(dto.name, dto.email);
        } catch (error) {
            this.handleDomainError(error);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Lista usuários' })
    findAll() {
        return this.listUsersUseCase.execute();
    }

    @Get(':id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: 'Busca usuário por id' })
    async findById(@Param('id') id: string) {
        try {
            return await this.findUserByIdUseCase.execute(Number(id));
        } catch (error) {
            this.handleDomainError(error);
        }
    }

    @Put(':id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: 'Atualiza um usuário' })
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        try {
            return await this.updateUserUseCase.execute(Number(id), dto);
        } catch (error) {
            this.handleDomainError(error);
        }
    }

    @Patch(':id/deactivate')
    @ApiOperation({ summary: 'Desativa um usuário' })
    async deactivate(@Param('id') id: string) {
        try {
            return await this.deactivateUserUseCase.execute(Number(id));
        } catch (error) {
            this.handleDomainError(error);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um usuário' })
    async delete(@Param('id') id: string) {
        try {
            return await this.deleteUserUseCase.execute(Number(id));
        } catch (error) {
            this.handleDomainError(error);
        }
    }

    private handleDomainError(error: any) {
        if (error instanceof UserNotFoundException) {
            throw new NotFoundException(error.message);
        }
        if (error instanceof EmailAlreadyInUseException) {
            throw new BadRequestException(error.message);
        }
        throw error;
    }
}
