import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/bases/base.controller';
import { CategoryDTO } from 'src/domain/dto/categoryDTO';
import { Category } from 'src/domain/entities';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController extends BaseController<
    Category,
    CategoryDTO
> {
    constructor(protected service: CategoryService) {
        super(service);
    }


}
