import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { BaseController } from '../../common/bases/base.controller';
import { Product } from '../../domain/entities';
import { ProductDTO } from '../../domain/dto';
import { ErrorManager } from '../../common/exceptions/error.manager';

@Controller('product')
export class ProductController extends BaseController<
  Product,
  ProductDTO
> {
  constructor(protected service: ProductService) {
    super(service);
  }

  @Get()
  async findAllProducts(): Promise<ProductDTO[]> {
    try {
      return await this.service.findAllProducts();
    } catch (error) {
      throw ErrorManager.createSignatureError((error as Error).message);
    }
  }


}

