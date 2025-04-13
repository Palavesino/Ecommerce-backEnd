import { ErrorManager } from '../../common/exceptions/error.manager';
import { OrderDetailDTO } from '../dto';
import { OrderDetail } from '../entities';
import { ProductMapper } from './product.mapper';

export class OrderDetailMapper {

    static toDTO(entity: OrderDetail): OrderDetailDTO {
        try {

            const dto = new OrderDetailDTO();

            dto.id = entity.id;
            dto.createdAt = String(entity.createdAt);
            dto.deletedAt = String(entity.deletedAt);

            dto.quantity = entity.quantity;
            dto.subtotal = entity.subtotal;

            dto.itemProduct = ProductMapper.toDTO(entity.product);

            return dto;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping OrderDetail to DTO: ${error.message}`);
        }
    }

    static toEntity(dto: OrderDetailDTO): OrderDetail {
        try {

            const entity = new OrderDetail();

            entity.id = dto.id;

            entity.quantity = dto.quantity;
            entity.subtotal = dto.subtotal;

            if (dto.itemProduct) {
                entity.product = ProductMapper.toEntity(dto.itemProduct);
            }

            return entity;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO to OrderDetail: ${error.message}`);
        }
    }

    static toDTOList(entities: OrderDetail[]): OrderDetailDTO[] {
        try {
            if (!entities) return [];

            return entities.map(entity => this.toDTO(entity));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping OrderDetail list to DTO list: ${error.message}`);
        }
    }

    static toEntityList(dtos: OrderDetailDTO[]): OrderDetail[] {
        try {
            if (!dtos) return [];

            return dtos.map(dto => this.toEntity(dto));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO list to OrderDetail list: ${error.message}`);
        }
    }
}