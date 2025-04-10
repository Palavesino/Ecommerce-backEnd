import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/bases/base.controller';
import { Price } from '../../domain/entities';
import { PriceDTO } from '../../domain/dto';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController extends BaseController<
    Price,
    PriceDTO
> {
    constructor(protected service: PriceService) {
        super(service);
    }


}

