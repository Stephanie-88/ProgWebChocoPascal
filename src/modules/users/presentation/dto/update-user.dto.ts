import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'Ana Silva', required: false })
    name?: string;

    @ApiProperty({ example: 'ana@email.com', required: false })
    email?: string;
}
