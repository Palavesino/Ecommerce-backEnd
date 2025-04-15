import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { BaseController } from '../../common/bases/base.controller';
import { Price } from '../../domain/entities';
import { PriceDTO, ProductDTO } from '../../domain/dto';
import { PriceService } from './price.service';
import { ErrorManager } from '../../common/exceptions/error.manager';

@Controller('price')
export class PriceController extends BaseController<
    Price,
    PriceDTO
> {
    constructor(protected service: PriceService) {
        super(service);
    }
  @Get('/p/:id')
  async findPriceWithProductByIdProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductDTO> {
    try {
      return await this.service.findPriceByIdProduct(id);
    } catch (error) {
      throw ErrorManager.createSignatureError((error as Error).message);
    }
  }

}

