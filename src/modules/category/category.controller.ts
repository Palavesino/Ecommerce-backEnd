import { Controller, Get } from '@nestjs/common';

import { CategoryService } from './category.service';
import { BaseController } from '../../common/bases/base.controller';
import { Category } from '../../domain/entities';
import { CategoryDTO } from '../../domain/dto';
import { ErrorManager } from '../../common/exceptions/error.manager';

@Controller('category')
export class CategoryController extends BaseController<
    Category,
    CategoryDTO
> {
    constructor(protected service: CategoryService) {
        super(service);
    }
    @Get()
    async findAllCategorys(): Promise<CategoryDTO[]> {
        try {
            return await this.service.findAllCategory();
        } catch (error) {
            throw ErrorManager.createSignatureError((error as Error).message);
        }
    }

}
