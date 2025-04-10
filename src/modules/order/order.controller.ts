import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/bases/base.controller';
import { Order } from '../../domain/entities';
import { OrderDTO } from '../../domain/dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController extends BaseController<
    Order,
    OrderDTO
> {
    constructor(protected service: OrderService) {
        super(service);
    }


}
