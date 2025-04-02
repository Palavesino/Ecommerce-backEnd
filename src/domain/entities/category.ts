import { ApiProperty } from '@nestjs/swagger';
import { Base } from '../../common/bases/base.entity';
import { Column, Entity} from 'typeorm';


@Entity('category')
export class Category extends Base {
    @Column({
        type: 'varchar',
        nullable: false,
        length: 150
    })
     @ApiProperty({ example: 'Hamburguesas' })
    denomination: string;


}
