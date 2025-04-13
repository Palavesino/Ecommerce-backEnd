import { Product } from '../entities/product.entity';
import { ProductDTO } from '../dto/product.dto';
import { ErrorManager } from '../../common/exceptions/error.manager';
import { Category } from '../entities';

export class ProductMapper {

    static toDTO(entity: Product): ProductDTO {
        try {
            const dto = new ProductDTO();

            dto.id = entity.id;
            dto.createdAt = String(entity.createdAt);
            dto.deletedAt = String(entity.deletedAt);

            dto.denomination = entity.denomination;
            dto.description = entity.description;
            dto.imageUrl = entity.imageUrl;
            dto.availability = entity.availability;
            dto.isManufactured = entity.isManufactured;
            dto.cookingTime = entity.cookingTime;

            dto.categoryId = entity.category?.id ;
            

            return dto;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping Product to DTO: ${error.message}`);
        }
    }

    static toEntity(dto: ProductDTO): Product {
        try {
            const entity = new Product();

            entity.id = dto.id;

            entity.denomination = dto.denomination;
            entity.description = dto.description;
            entity.imageUrl = dto.imageUrl;
            entity.availability = dto.availability;
            entity.isManufactured = dto.isManufactured;
            entity.cookingTime = dto.cookingTime;

            if (dto.categoryId) {
                entity.category = new Category();
                entity.category.id = dto.categoryId;
            }

            return entity;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO to Product: ${error.message}`);
        }
    }

    static toDTOList(entities: Product[]): ProductDTO[] {
        try {
            return entities.map(entity => this.toDTO(entity));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping Product list to DTO list: ${error.message}`);
        }
    }

    static toEntityList(dtos: ProductDTO[]): Product[] {
        try {
            if (!dtos) return [];

            return dtos.map(dto => this.toEntity(dto));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO list to Product list: ${error.message}`);
        }
    }
}