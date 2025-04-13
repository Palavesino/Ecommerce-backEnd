import { ErrorManager } from "src/common/exceptions/error.manager";
import { OrderDTO } from "../dto";
import { Order } from "../entities";
import { OrderDetailMapper } from "./order_detail.mapper";

export class OrderMapper {
    static toDTO(entity: Order): OrderDTO {
        try {
            const dto = new OrderDTO();

            // Mapeo de propiedades base
            dto.id = entity.id;
            dto.createdAt = String(entity.createdAt);
            dto.deletedAt = String(entity.deletedAt);

            // Mapeo de propiedades específicas de Order
            dto.dateTime = entity.dateTime.toISOString();
            dto.paid = entity.paid;
            dto.discount = Number(entity.discount);
            dto.total = Number(entity.total);
            dto.address = entity.address;
            dto.apartment = entity.apartment || null;
            dto.phone = entity.phone;
            dto.estimatedTime = entity.estimatedTime || null;
            dto.deliveryMethod = entity.deliveryMethod;
            dto.state = entity.state;
            dto.paymentType = entity.paymentType;
            dto.isCanceled = entity.isCanceled;

            // Mapeo de relaciones
            if (entity.orderDetails) {
                dto.orderDetails = OrderDetailMapper.toDTOList(entity.orderDetails);
            }

            return dto;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping Order to DTO: ${error.message}`);
        }
    }

    static toEntity(dto: OrderDTO): Order {
        try {
            const entity = new Order();

            // Mapeo de propiedades base
            entity.id = dto.id;

            // Mapeo de propiedades específicas de Order
            entity.dateTime = new Date(dto.dateTime);
            entity.paid = dto.paid;
            entity.discount = dto.discount;
            entity.total = dto.total;
            entity.address = dto.address;
            entity.apartment = dto.apartment || null;
            entity.phone = dto.phone;
            entity.estimatedTime = dto.estimatedTime || null;
            entity.deliveryMethod = dto.deliveryMethod;
            entity.state = dto.state;
            entity.paymentType = dto.paymentType;
            entity.isCanceled = dto.isCanceled;

            // Mapeo de relaciones
            if (dto.orderDetails) {
                entity.orderDetails = OrderDetailMapper.toEntityList(dto.orderDetails);
            }

            return entity;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO to Order: ${error.message}`);
        }
    }

    static toDTOList(entities: Order[]): OrderDTO[] {
        try {
            return entities.map(entity => this.toDTO(entity));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping Order list to DTO list: ${error.message}`);
        }
    }

    static toEntityList(dtos: OrderDTO[]): Order[] {
        try {
            if (!dtos) return [];

            return dtos.map(dto => this.toEntity(dto));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO list to Order list: ${error.message}`);
        }
    }
}