import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FullBaseDto } from '../../common/dtos';
import { ProductDTO } from './product.dto';

export class OrderDetailDTO extends FullBaseDto {
  @Expose()
  @ApiProperty({
    example: 2,
    description: 'Cantidad del producto'
  })
  quantity: number;

  @Expose()
  @ApiProperty({
    example: 31.98,
    description: 'Subtotal (precio unitario x cantidad)'
  })
  subtotal: number;

  @Expose()
  @ApiProperty({
    type: ProductDTO,
    description: 'Producto asociado a este detalle'
  })
  itemProduct: ProductDTO;
}