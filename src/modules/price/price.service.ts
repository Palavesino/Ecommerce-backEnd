import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/bases/base.service';
import {Repository } from 'typeorm';
import { Price } from '../../domain/entities';
import { PriceDTO } from '../../domain/dto';

@Injectable()
export class PriceService extends BaseService<Price, PriceDTO> {
    constructor(
        @InjectRepository(Price) protected repository: Repository<Price>,
      ) {
        super(repository);
      }
}