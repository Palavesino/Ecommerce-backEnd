import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { BaseController } from '../../common/bases/base.controller';
import { Product } from '../../domain/entities';
import { ProductDTO } from '../../domain/dto';

@Controller('product')
export class ProductController extends BaseController<
  Product,
  ProductDTO
> {
  constructor(protected service: ProductService) {
    super(service);
  }


}

