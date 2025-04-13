import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
    ParseUUIDPipe,
    BadRequestException,
  } from '@nestjs/common';
  import { BaseService } from './base.service';
  import { Base } from './base.entity';
  import { ErrorManager } from '../exceptions/error.manager';
import { DeepPartial } from 'typeorm';
  
  @Controller()
  export abstract class BaseController<
    T extends Base,
    CreateDto extends DeepPartial<T>,
  > {
    constructor(protected readonly service: BaseService<T, CreateDto>) {}
  
    @Get()
    async findAll(@Query() query: any): Promise<T[]> {
      try {
        return await this.service.findAll(query);
      } catch (error) {
        throw ErrorManager.createSignatureError((error as Error).message);
      }
    }
  
    @Get('paginated')
    async paginate(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query() filters?: any
    ): Promise<{ data: T[]; total: number; pages: number }> {
      try {
        return await this.service.paginate(
          Number(page),
          Number(limit),
          filters
        );
      } catch (error) {
        throw ErrorManager.createSignatureError((error as Error).message);
      }
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<T> {
      try {
        return await this.service.findOne(id);
      } catch (error) {
        throw ErrorManager.createSignatureError((error as Error).message);
      }
    }
  
    @Post()
    async create(@Body() createDto: CreateDto): Promise<T> {
      try {
        return await this.service.create(createDto);
      } catch (error) {
        throw ErrorManager.createSignatureError((error as Error).message);
      }
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateDto: CreateDto
    ): Promise<T> {
      try {
        return await this.service.update(id, updateDto);
      } catch (error) {
        throw ErrorManager.createSignatureError((error as Error).message);
      }
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
      try {
        await this.service.remove(id);
      } catch (error) {
        throw ErrorManager.createSignatureError((error as Error).message);
      }
    }
  
    @Delete(':id/soft')
    async softRemove(@Param('id', ParseUUIDPipe) id: string): Promise<T> {
      try {
        return await this.service.softRemove(id);
      } catch (error) {
        throw ErrorManager.createSignatureError((error as Error).message);
      }
    }
  
    @Put(':id/restore')
    async restore(@Param('id', ParseUUIDPipe) id: string): Promise<T> {
      try {
        return await this.service.restore(id);
      } catch (error) {
        throw ErrorManager.createSignatureError((error as Error).message);
      }
    }
  }