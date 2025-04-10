import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/bases/base.service';
import {Repository } from 'typeorm';
import { OrderDetail } from '../../domain/entities';
import { OrderDetailDTO } from '../../domain/dto';

@Injectable()
export class OrderDetailService  extends BaseService<OrderDetail, OrderDetailDTO> {
    constructor(
        @InjectRepository(OrderDetail) protected repository: Repository<OrderDetail>,
      ) {
        super(repository);
      }
}

