import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Ana Silva' })
    name: string;

    @ApiProperty({ example: 'ana@email.com' })
    email: string;
}

