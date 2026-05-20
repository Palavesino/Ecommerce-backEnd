import { ApiProperty } from '@nestjs/swagger';
import { Base } from '../../common/bases/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('product')
export class Product extends Base {
    @Column({
        name: 'denomination',
        type: 'varchar',
        length: 150,
        nullable: false
    })
    @ApiProperty({ example: 'Hamburguesa Clásica' })
    denomination: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: true
    })
    @ApiProperty({ example: 'Deliciosa hamburguesa con queso y vegetales' })
    description: string;
    @Column({
        name: 'imageUrl',
        type: 'varchar',
        length: 400,
        nullable: true
    })
    @ApiProperty({ example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS81NUYU0UuZJk5FN_C6qdauLhmg6UHjtcBgA&s' })
    imageUrl: string;

    @Column({
        name: 'sell_price',
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        },
        nullable: false
    })
    @ApiProperty({ example: 19.99 })
    sellPrice: number;
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
        name: 'availability',
        type: 'boolean',
        default: true
    })
    @ApiProperty({ example: true })
    availability: boolean;

    @Column({
        name: 'is_manufactured',
        type: 'boolean',
        default: false,
        comment: 'Indica si es un producto manufacturado (true) o un insumo/bebida (false)'
    })
    @ApiProperty({ example: true })
    isManufactured: boolean;

    @Column({
        name: 'cooking_time',
        type: 'time',
        nullable: true,
        comment: 'Tiempo de cocina (solo para productos manufacturados)'
    })
    @ApiProperty({ example: '00:30:00' })
    cookingTime: string | null;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'id_category' })
    category: Category;

}