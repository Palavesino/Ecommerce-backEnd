import { Controller } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { BaseController } from '../../common/bases/base.controller';
import { OrderDetail } from '../../domain/entities';
import { OrderDetailDTO } from '../../domain/dto';

@Controller('order-detail')
export class OrderDetailController extends BaseController<
    OrderDetail,
    OrderDetailDTO
> {
    constructor(protected service: OrderDetailService) {
        super(service);
    }


}
