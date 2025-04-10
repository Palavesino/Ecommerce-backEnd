import { ApiProperty } from '@nestjs/swagger';
import { Base } from '../../common/bases/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity('order_detail')
export class OrderDetail extends Base {
  @Column({
    name: 'quantity',
    type: 'int',
    nullable: false
  })
  @ApiProperty({ example: 2 })
  quantity: number;

  @Column({
    name: 'subtotal',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false
  })
  @ApiProperty({ example: 19.98 })
  subtotal: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'id_order' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_product' })
  product: Product;
}