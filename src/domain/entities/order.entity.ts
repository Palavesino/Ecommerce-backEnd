import { ApiProperty } from '@nestjs/swagger';
import { Base } from '../../common/bases/base.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderDetail } from './order_detail.entity';
import { PaymentStatus } from '../enum/Paid';
import { OrderStatus } from '../enum/OrderStatus';



@Entity('user_order')
export class Order extends Base {
    @Column({
        name: 'date_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @ApiProperty({ example: '2023-05-20T14:30:00Z' })
    dateTime: Date;

    @Column({
        name: 'paid',
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.IN_PROCESS
    })
    @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.IN_PROCESS })
    paid: PaymentStatus;

    @Column({
        name: 'discount',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0
    })
    @ApiProperty({ example: 5.00 })
    discount: number;

    @Column({
        name: 'total',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    @ApiProperty({ example: 25.99 })
    total: number;

    @Column({
        name: 'address',
        type: 'varchar',
        length: 255
    })
    @ApiProperty({ example: 'Calle Principal 123' })
    address: string;

    @Column({
        name: 'apartment',
        type: 'varchar',
        length: 50,
        nullable: true
    })
    @ApiProperty({ example: 'Apto 4B', required: false })
    apartment: string | null;

    @Column({
        name: 'phone',
        type: 'varchar',
        length: 20
    })
    @ApiProperty({ example: '+5491122334455' })
    phone: string;

    @Column({
        name: 'estimated_time',
        type: 'time',
        nullable: true
    })
    @ApiProperty({ example: '00:45:00', required: false })
    estimatedTime: string | null;

    @Column({
        name: 'delivery_method',
        type: 'varchar',
        length: 50
    })
    @ApiProperty({ example: 'DELIVERY' })
    deliveryMethod: string;

    @Column({
        name: 'state',
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING })
    state: OrderStatus;

    @Column({
        name: 'payment_type',
        type: 'varchar',
        length: 50
    })
    @ApiProperty({ example: 'CARD' })
    paymentType: string;

    @Column({
        name: 'is_canceled',
        type: 'boolean',
        default: false
    })
    @ApiProperty({ example: false })
    isCanceled: boolean;

    @OneToMany(() => OrderDetail, (detail) => detail.order, {
        cascade: true
    })
    orderDetails: OrderDetail[];
}