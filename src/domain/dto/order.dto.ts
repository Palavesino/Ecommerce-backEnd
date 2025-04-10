import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FullBaseDto } from '../../common/dtos';
import { OrderDetailDTO } from './order_detail.dto';

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    FAILED = 'FAILED'
}

export enum OrderStatus {
    RECEIVED = 'RECEIVED',
    PREPARING = 'PREPARING',
    READY = 'READY',
    DELIVERING = 'DELIVERING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export class OrderDTO extends FullBaseDto {
    @Expose()
    @ApiProperty({
        example: 'Av. Siempreviva 742',
        description: 'Dirección de entrega'
    })
    address: string;

    @Expose()
    @ApiProperty({
        example: 'Apto 3B',
        description: 'Departamento/Piso (opcional)',
        nullable: true,
        required: false
    })
    apartment?: string;

    @Expose()
    @ApiProperty({
        example: 5.00,
        description: 'Descuento aplicado al pedido'
    })
    discount: number;

    @Expose()
    @ApiProperty({
        example: '00:45:00',
        description: 'Tiempo estimado de entrega',
        nullable: true,
        required: false,
    })
    estimatedTime?: string;

    @Expose()
    @ApiProperty({
        enum: PaymentStatus,
        example: PaymentStatus.PAID,
        description: 'Estado del pago'
    })
    paid: PaymentStatus;

    @Expose()
    @ApiProperty({
        example: false,
        description: 'Indica si el pedido fue cancelado'
    })
    isCanceled: boolean;

    @Expose()
    @ApiProperty({
        example: '+5491122334455',
        description: 'Teléfono de contacto'
    })
    phone: string;

    @Expose()
    @ApiProperty({
        example: 45.99,
        description: 'Total del pedido'
    })
    total: number;

    @Expose()
    @ApiProperty({
        example: 'DELIVERY',
        description: 'Método de entrega (DELIVERY/PICKUP)'
    })
    deliveryMethod: string;

    @Expose()
    @ApiProperty({
        enum: OrderStatus,
        example: OrderStatus.PREPARING,
        description: 'Estado actual del pedido'
    })
    state: OrderStatus;

    @Expose()
    @ApiProperty({
        example: 'CREDIT_CARD',
        description: 'Tipo de pago utilizado'
    })
    paymentType: string;

    @Expose()
    @ApiProperty({
        example: '2024-05-20T14:30:00',
        description: 'Fecha y hora del pedido'
    })
    dateTime: string;

    @Expose()
    @Type(() => OrderDetailDTO)
    @ApiProperty({
        type: [OrderDetailDTO],
        description: 'Detalles de los productos del pedido'
    })
    orderDetails: OrderDetailDTO[];
}