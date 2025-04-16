import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail, Product } from '../../domain/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail,Product]),
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  exports: [OrderDetailService], 
})
export class OrderDetailModule { }
