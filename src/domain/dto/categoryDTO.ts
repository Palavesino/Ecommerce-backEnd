

import { Expose } from 'class-transformer';
import { FullBaseDto } from '../../common/dtos';

export class CategoryDTO extends FullBaseDto {
    @Expose()
    denomination: string;
}
