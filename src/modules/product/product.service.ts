import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/bases/base.service';
import {Repository } from 'typeorm';
import { Product } from '../../domain/entities';
import { ProductDTO } from '../../domain/dto';

@Injectable()
export class ProductService  extends BaseService<Product, ProductDTO> {
    constructor(
        @InjectRepository(Product) protected repository: Repository<Product>,
      ) {
        super(repository);
      }
}
