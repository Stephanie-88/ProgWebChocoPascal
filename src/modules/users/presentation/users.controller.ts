import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um usuário' })
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto.name, dto.email);
    }

    @Get()
    @ApiOperation({ summary: 'Lista usuários' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: 'Busca usuário por id' })
    findById(@Param('id') id: string) {
        return this.usersService.findById(Number(id));
    }

    @Patch(':id/deactivate')
    @ApiOperation({ summary: 'Desativa um usuário' })
    deactivate(@Param('id') id: string) {
        return this.usersService.deactivate(Number(id));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um usuário' })
    delete(@Param('id') id: string) {
        return this.usersService.delete(Number(id));
    }
}
