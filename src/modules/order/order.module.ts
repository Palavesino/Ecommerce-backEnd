import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../domain/entities';

@Module({
   imports: [
      TypeOrmModule.forFeature([Order]), 
    ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
