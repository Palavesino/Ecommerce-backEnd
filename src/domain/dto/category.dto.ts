import { FullBaseDto } from '../../common/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryDTO extends FullBaseDto {
    @Expose()
    @ApiProperty({
        example: 'Bebidas',
        description: 'Nombre de la categoría'
    })
    denomination: string;

    @Expose()
    @ApiProperty({
        example: 'A',
        description: 'Tipo de categoría (un solo caracter)',
        maxLength: 1
    })
    type: string;

    @Expose()
    @ApiProperty({
        example: true,
        description: 'Indica si la categoría está disponible',
        default: true
    })
    availability: boolean;

    @Expose()
    @ApiProperty({
        example: '50436717-8608-4bff-bf41-373f14a8b888',
        description: 'ID de la categoría padre',
        nullable: true,
        required: false
    })
    categoryFatherId: string | null;

    @Expose()
    @ApiProperty({
        example: 'Alimentos',
        description: 'Nombre de la categoría padre',
        nullable: true,
        required: false
    })
    categoryFatherDenomination: string | null;
}