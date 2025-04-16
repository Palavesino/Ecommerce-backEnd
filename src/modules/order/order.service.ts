import { Injectable } from '@nestjs/common';
import { OrderDetailDTO, OrderDTO } from '../../domain/dto';
import { Order } from '../../domain/entities';
import { BaseService } from '../../common/bases/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { OrderMapper } from '../../domain/mapper/order.mapper';
import { OrderDetailService } from '../order_detail/order_detail.service';
import dayjs from 'dayjs';


@Injectable()
export class OrderService extends BaseService<Order, OrderDTO> {
  constructor(
    @InjectRepository(Order) protected repository: Repository<Order>,
    private readonly orderDetailService: OrderDetailService,
  ) {
    super(repository);
  }

  @Transactional()
  async saveOrder(dto: OrderDTO): Promise<OrderDTO> {
    try {
      const orderDetails = dto.orderDetails;

      let order = OrderMapper.toEntity(dto);


      order.dateTime = new Date();

      // 🔹 Cálculo del tiempo estimado
      const estimatedTimeMinutes = await this.calculateEstimatedTime(orderDetails, dto.deliveryMethod);

      const estimatedDate = dayjs().startOf('day').add(estimatedTimeMinutes, 'minute');
      const estimatedTimeStr = estimatedDate.format('HH:mm:ss');

      order.estimatedTime = estimatedTimeStr;

      const savedOrder = await this.repository.save(order);

      // 🔹 Guardar detalles del pedido con el pedido recién guardado
      const savedDetails = await this.orderDetailService.saveOrderDetails(orderDetails, savedOrder);
      savedOrder.orderDetails = savedDetails;

      // 🔹 Convertir a DTO final
      let resultDto = OrderMapper.toDTO(savedOrder);

      return resultDto;
    } catch (e) {
      throw new Error('Error saving order: ' + e.message);
    }
  }
  private async calculateEstimatedTime(orderDetails: OrderDetailDTO[], deliveryMethod: string): Promise<number> {
    let totalTime = 0;

    for (const detail of orderDetails) {
      if (detail.itemProduct.cookingTime) {
        const cookingTime = detail.itemProduct.cookingTime;

        const localCookingTime = new Date(cookingTime);
        const hours = localCookingTime.getUTCHours();
        const minutes = localCookingTime.getUTCMinutes();

        totalTime += ((hours * 60) + minutes) * (detail.quantity || 1);
      }
    }

    // 🔹 Obtener el tiempo de todas las órdenes en cocina
    const totalDeliveredTime = 30;


    const activeCooks = 1;

    let estimatedTime = totalTime;
    estimatedTime += totalDeliveredTime / (activeCooks > 0 ? activeCooks : 1);

    // 🔹 Si es delivery, sumamos 10 minutos extra
    if (deliveryMethod?.toLowerCase() === 'delivery') {
      estimatedTime += 10;
    }

    return estimatedTime;
  }



}