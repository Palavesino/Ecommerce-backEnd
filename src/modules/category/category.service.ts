import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/bases/base.service';
import { CategoryDTO } from '../../domain/dto/category.dto';
import { Category } from '../../domain/entities';
import {Repository } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryDTO> {
    constructor(
        @InjectRepository(Category) protected repository: Repository<Category>,
      ) {
        super(repository);
      }
}
