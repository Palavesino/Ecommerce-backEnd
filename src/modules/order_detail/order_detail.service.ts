import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/bases/base.service';
import { Repository } from 'typeorm';
import { Order, OrderDetail, Product } from '../../domain/entities';
import { OrderDetailDTO } from '../../domain/dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { OrderDetailMapper } from '../../domain/mapper/order_detail.mapper';
import { ProductMapper } from '../../domain/mapper/product.mapper';

@Injectable()
export class OrderDetailService extends BaseService<OrderDetail, OrderDetailDTO> {
  constructor(
    @InjectRepository(OrderDetail) protected repository: Repository<OrderDetail>,
    @InjectRepository(Product) protected  readonly productRepository: Repository<Product>,
  ) {
    super(repository);
  }

  @Transactional()
  async saveOrderDetails(listDto: OrderDetailDTO[], order: Order): Promise<OrderDetail[]> {
    try {
      const orderDetailList: OrderDetail[] = [];

      for (const dto of listDto) {
        const orderDetail = OrderDetailMapper.toEntity(dto);

        if (
          dto.itemProduct &&
          await this.productRepository.exist({ where: { id: dto.itemProduct.id } })
        ) {
          orderDetail.product = ProductMapper.toEntity(dto.itemProduct);
        }

        orderDetail.order = order;
        orderDetailList.push(orderDetail);
      }

      return await this.repository.save(orderDetailList);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

