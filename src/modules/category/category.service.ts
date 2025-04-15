import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/bases/base.service';
import { CategoryDTO } from '../../domain/dto/category.dto';
import { Category } from '../../domain/entities';
import {Repository } from 'typeorm';
import { ErrorManager } from 'src/common/exceptions/error.manager';
import { IsNull } from 'typeorm';
import { CategoryMapper } from '../../domain/mapper/category.mapper';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryDTO> {
    constructor(
        @InjectRepository(Category) protected repository: Repository<Category>,
      ) {
        super(repository);
      }
        async findAllCategory(): Promise<CategoryDTO[]> {
        try {
          const categories = await this.repository.find({
            relations: ['fatherCategory'],
            where: { deletedAt: IsNull() }
          });
          return CategoryMapper.toDTOList(categories);
        } catch (error) {
          throw ErrorManager.createSignatureError((error as Error).message);
        }
      }
      async CategoryCatalogue(): Promise<CategoryDTO[]> {
        try {
          const categories = await this.repository.find({
            relations: ['fatherCategory'],
            where: [
              { deletedAt: IsNull(), type: "M" },  
              { deletedAt: IsNull(), type: "P" }   
            ]
          });
          return CategoryMapper.toDTOList(categories);
        } catch (error) {
          throw ErrorManager.createSignatureError((error as Error).message);
        }
      }
    
}
