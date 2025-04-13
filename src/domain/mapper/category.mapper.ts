import { Category } from '../entities/category.entity';
import { CategoryDTO } from '../dto/category.dto';
import { ErrorManager } from '../../common/exceptions/error.manager';

export class CategoryMapper {

    static toDTO(entity: Category): CategoryDTO {
        try {
            const dto = new CategoryDTO();

            dto.id = entity.id;
            dto.createdAt = String(entity.createdAt);
            dto.deletedAt = String(entity.deletedAt);

            dto.denomination = entity.denomination;
            dto.type = entity.type;
            dto.availability = entity.availability;

            dto.categoryFatherId = entity.fatherCategory?.id || null;
            dto.categoryFatherDenomination = entity.fatherCategory?.denomination || null;

            return dto;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping Category to DTO: ${error.message}`);
        }
    }

    static toEntity(dto: CategoryDTO): Category {
        try {
            const entity = new Category();

            entity.id = dto.id;
            entity.denomination = dto.denomination;
            entity.type = dto.type;
            entity.availability = dto.availability;

            if (dto.categoryFatherId) {
                entity.fatherCategory = new Category();
                entity.fatherCategory.id = dto.categoryFatherId;
            }

            return entity;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO to Category: ${error.message}`);
        }
    }

    static toDTOList(entities: Category[]): CategoryDTO[] {
        try {
            return entities.map(entity => this.toDTO(entity));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping Category list to DTO list: ${error.message}`);
        }
    }

    static toEntityList(dtos: CategoryDTO[]): Category[] {
        try {
            if (!dtos) return [];

            return dtos.map(dto => this.toEntity(dto));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO list to Category list: ${error.message}`);
        }
    }
}