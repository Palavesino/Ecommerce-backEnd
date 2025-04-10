import { ApiProperty } from '@nestjs/swagger';
import { Base } from '../../common/bases/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('price')
export class Price extends Base {
    @Column({
        name: 'sell_price',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    @ApiProperty({ example: 19.99 })
    sellPrice: number;

    @Column({
        name: 'sell_price_date',
        type: 'timestamp',
        nullable: false
    })
    @ApiProperty({ example: '2023-05-15T12:00:00Z' })
    sellPriceDate: Date;

    @Column({
        name: 'cost_price',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    @ApiProperty({ example: 8.50 })
    costPrice: number;

    @Column({
        name: 'cost_price_date',
        type: 'timestamp',
        nullable: false
    })
    @ApiProperty({ example: '2023-05-10T12:00:00Z' })
    costPriceDate: Date;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'id_product' })
    product: Product;
}