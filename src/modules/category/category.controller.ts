import { Controller } from '@nestjs/common';

import { CategoryService } from './category.service';
import { BaseController } from '../../common/bases/base.controller';
import { Category } from '../../domain/entities';
import { CategoryDTO } from '../../domain/dto';

@Controller('category')
export class CategoryController extends BaseController<
    Category,
    CategoryDTO
> {
    constructor(protected service: CategoryService) {
        super(service);
    }


}
