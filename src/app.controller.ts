import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ClienteDTO } from './models/cliente.dto';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('clientes/adicionar')
  adicionarCliente(@Body() cliente: ClienteDTO): { mensagem: string, cliente: ClienteDTO } {
    return this.appService.adicionarCliente(cliente);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('vamos/:nome')
  getHello2(@Param('nome') name: string): string {
    return this.appService.getHello2(name);
  }

  @Get('chegamos')
  @ApiQuery({ name: 'nome', type: String, description: 'informe o nome do usuário para saudação' })
  @ApiQuery({ name: 'idade', type: Number, description: 'informe a idade do usuário' })
  getHello3(@Query() query: { nome: string, idade: number }): string {
    const cliente = { name: query.nome, age: query.idade };
    return this.appService.getHello3(cliente);
  }

  @Get('clientes/listar')
  listarClientes(): ClienteDTO[] {
    return this.appService.listarClientes();
  }
}
