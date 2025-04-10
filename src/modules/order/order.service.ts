import { Injectable } from '@nestjs/common';
import { OrderDTO } from '../../domain/dto';
import { Order } from '../../domain/entities';
import { BaseService } from '../../common/bases/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class OrderService extends BaseService<Order, OrderDTO> {
    constructor(
        @InjectRepository(Order) protected repository: Repository<Order>,
      ) {
        super(repository);
      }
}