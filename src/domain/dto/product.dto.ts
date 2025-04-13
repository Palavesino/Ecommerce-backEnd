import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FullBaseDto } from '../../common/dtos';
import { PriceDTO } from './price.dto';

export class ProductDTO extends FullBaseDto {
    @Expose()
    @ApiProperty({
        example: 'Hamburguesa Especial',
        description: 'Nombre del producto'
    })
    denomination: string;

    @Expose()
    @ApiProperty({
        example: 'Hamburguesa con queso, panceta y aderezo especial',
        description: 'Descripción detallada del producto',
        nullable: true
    })
    description: string;

    @Expose()
    @ApiProperty({
        example: true,
        description: 'Indica si el producto está disponible para la venta',
        default: true
    })
    availability: boolean;
    @Expose()
    @ApiProperty({
        example: 'http//linkImage.com',
        description: 'Link de la imagen'
    })
    imageUrl: string;
    @Expose()
    @ApiProperty({
        example: '00:30:00',
        description: 'Tiempo de cocina requerido (solo para productos manufacturados)',
        nullable: true
    })
    cookingTime: string | null;

    @Expose()
    @ApiProperty({
        example: true,
        description: 'Indica si es un producto manufacturado (true) o un insumo/bebida (false)'
    })
    isManufactured: boolean;

    @Expose()
    @ApiProperty({
        example: '55046717-8608-4bff-bf41-373f14a8b777',
        description: 'ID de la categoría a la que pertenece el producto'
    })
    categoryId: string;

    @Expose()
    @ApiProperty({
        type: PriceDTO,
        description: 'Información de precios del producto'
    })
    price: PriceDTO;
}