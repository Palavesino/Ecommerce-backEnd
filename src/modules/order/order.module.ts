import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../domain/entities';
import { OrderDetailModule } from '../order_detail/order_detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),  
    OrderDetailModule, 
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
