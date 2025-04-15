import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/bases/base.service';
import {IsNull, Repository } from 'typeorm';
import { Product } from '../../domain/entities';
import { ProductDTO } from '../../domain/dto';
import { ProductMapper } from '../../domain/mapper/product.mapper';
import { ErrorManager } from '../../common/exceptions/error.manager';

@Injectable()
export class ProductService  extends BaseService<Product, ProductDTO> {
    constructor(
        @InjectRepository(Product) protected repository: Repository<Product>,
      ) {
        super(repository);
      }

        async findAllProducts(): Promise<ProductDTO[]> {
              try {
                const products = await this.repository.find({
                  relations: ['category'],
                  where: { deletedAt: IsNull() }
                });
                return ProductMapper.toDTOList(products);
              } catch (error) {
                throw ErrorManager.createSignatureError((error as Error).message);
              }
            }
}
