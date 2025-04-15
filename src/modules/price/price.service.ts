import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/bases/base.service';
import { IsNull, Repository } from 'typeorm';
import { Price } from '../../domain/entities';
import { PriceDTO, ProductDTO } from '../../domain/dto';
import { ErrorManager } from '../../common/exceptions/error.manager';
import { ProductMapper } from '../../domain/mapper/product.mapper';
import { PriceMapper } from '../../domain/mapper/price.mapper';

@Injectable()
export class PriceService extends BaseService<Price, PriceDTO> {
  constructor(
    @InjectRepository(Price) protected repository: Repository<Price>,
  ) {
    super(repository);
  }
  async findPriceByIdProduct(id: string): Promise<ProductDTO> {
    try {
      const price = await this.repository.findOne({
        where: { product: { id }, deletedAt: IsNull() },
        relations: ['product'],
      });
      if (!price) {
        throw new NotFoundException(`Price with Product ID ${id} not found`);
      }
      const productDto = ProductMapper.toDTO(price.product)
      productDto.price = PriceMapper.toDTO(price)
      productDto.price.costPrice = 0;
      return productDto
    } catch (error) {
      throw ErrorManager.createSignatureError((error as Error).message);
    }
  }
}