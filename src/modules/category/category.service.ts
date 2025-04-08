import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/bases/base.service';
import { CategoryDTO } from 'src/domain/dto/categoryDTO';
import { Category } from 'src/domain/entities';
import {Repository } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryDTO> {
    constructor(
        @InjectRepository(Category) protected repository: Repository<Category>,
      ) {
        super(repository);
      }
}
