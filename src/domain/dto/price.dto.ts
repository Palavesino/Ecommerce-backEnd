import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FullBaseDto } from '../../common/dtos';

export class PriceDTO extends FullBaseDto {
    @Expose()
    @ApiProperty({
        example: 19.99,
        description: 'Precio de venta al público',
        type: Number
    })
    sellPrice: number;

    @Expose()
    @ApiProperty({
        example: 8.50,
        description: 'Precio de costo',
        type: Number
    })
    costPrice: number;
}