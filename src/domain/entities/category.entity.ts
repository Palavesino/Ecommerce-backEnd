import { ApiProperty } from '@nestjs/swagger';
import { Base } from '../../common/bases/base.entity';
import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';

@Entity('category')
export class Category extends Base {
    @Column({
        name: 'denomination',
        type: 'varchar',
        nullable: true
    })
    @ApiProperty({ example: 'Comida Rápida' })
    denomination: string;

    @Column({
        name: 'type',
        type: 'char',
        nullable: true
    })
    @ApiProperty({ example: 'A' })
    type: string;

    @Column({
        name: 'availability',
        type: 'boolean',
        default: true
    })
    @ApiProperty({ example: true })
    availability: boolean;

    @ManyToOne(() => Category, (category) => category.childCategories)
    @JoinColumn({ name: 'idFatherCategory' })
    fatherCategory: Category;

    @OneToMany(() => Category, (category) => category.fatherCategory, {
        eager: true
    })
    childCategories: Category[];
}