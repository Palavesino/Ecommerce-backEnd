import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import {
    Repository,
    DeepPartial,
    FindOneOptions,
    FindManyOptions,
    DeleteResult,
} from 'typeorm';
import { Base } from './base.entity';
import { ErrorManager } from '../exceptions/error.manager';

@Injectable()
export abstract class BaseService<
    T extends Base,
    CreateDto extends DeepPartial<T>,
> {
    constructor(protected readonly repository: Repository<T>) { }

    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        try {
            return await this.repository.find(options);
        } catch (error) {
            throw ErrorManager.createSignatureError((error as Error).message);
        }
    }

    async findOne(id: string, options?: FindOneOptions<T>): Promise<T> {
        try {
            const record = await this.repository.findOne({
                where: { id } as any,
                ...options,
            });
            if (!record) {
                throw new NotFoundException(`Record with ID ${id} not found`);
            }
            return record;
        } catch (error) {
            throw ErrorManager.createSignatureError((error as Error).message);
        }
    }

    async create(createDto: CreateDto): Promise<T> {
        try {
            const entity = this.repository.create(createDto);
            return await this.repository.save(entity);
        } catch (error) {
            throw ErrorManager.createSignatureError((error as Error).message);
        }
    }

    async update(id: string, updateDto: CreateDto): Promise<T> {
        try {
            const existingRecord = await this.findOne(id);
            const updatedRecord = this.repository.merge(existingRecord, updateDto);
            return await this.repository.save(updatedRecord);
        } catch (error) {
            throw ErrorManager.createSignatureError((error as Error).message);
        }
    }

    async remove(id: string): Promise<DeleteResult> {
        try {
            await this.findOne(id); // Verifica que existe antes de eliminar
            return await this.repository.delete(id);
        } catch (error) {
            throw ErrorManager.createSignatureError((error as Error).message);
        }
    }

    async softRemove(id: string): Promise<T> {
        try {
            const record = await this.findOne(id);
            return await this.repository.softRemove(record);
        } catch (error) {
            throw ErrorManager.createSignatureError((error as Error).message);
        }
    }

    async restore(id: string): Promise<T> {
        try {
            const record = await this.repository.findOne({
                where: { id } as any,
                withDeleted: true,
            });
            if (!record) {
                throw new NotFoundException(`Record with ID ${id} not found`);
            }
            if (!record.deletedAt) {
                throw new BadRequestException(`Record with ID ${id} is not deleted`);
            }
            record.deletedAt = null;
            return await this.repository.save(record);
        } catch (error) {
            throw ErrorManager.createSignatureError((error as Error).message);
        }
    }

    async paginate(
        page: number = 1,
        limit: number = 10,
        options?: FindManyOptions<T>
    ): Promise<{ data: T[]; total: number; pages: number }> {
        try {
            const [data, total] = await this.repository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                ...options,
            });

            return {
                data,
                total,
                pages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw ErrorManager.createSignatureError((error as Error).message);
        }
    }
}