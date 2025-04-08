

import { Expose } from 'class-transformer';
import { FullBaseDto } from 'src/common/dtos';

export class CategoryDTO extends FullBaseDto {
    @Expose()
    denomination: string;
}
