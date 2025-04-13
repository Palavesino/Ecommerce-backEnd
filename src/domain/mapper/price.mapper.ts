import { ErrorManager } from "src/common/exceptions/error.manager";
import { PriceDTO } from "../dto";
import { Price } from "../entities";

export class PriceMapper {
    static toDTO(entity: Price): PriceDTO {
        try {
            const dto = new PriceDTO();

            dto.id = entity.id;
            dto.createdAt = String(entity.createdAt);
            dto.deletedAt = String(entity.deletedAt);

            dto.sellPrice = Number(entity.sellPrice);
            dto.costPrice = Number(entity.costPrice);

            return dto;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping Price to DTO: ${error.message}`);
        }
    }

    static toEntity(dto: PriceDTO): Price {
        try {
            const entity = new Price();

            entity.id = dto.id;

            entity.sellPrice = dto.sellPrice;
            entity.costPrice = dto.costPrice;

            return entity;
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO to Price: ${error.message}`);
        }
    }

    static toDTOList(entities: Price[]): PriceDTO[] {
        try {
            return entities.map(entity => this.toDTO(entity));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping Price list to DTO list: ${error.message}`);
        }
    }

    static toEntityList(dtos: PriceDTO[]): Price[] {
        try {
            if (!dtos) return [];

            return dtos.map(dto => this.toEntity(dto));
        } catch (error) {
            throw ErrorManager.createSignatureError(`Error mapping DTO list to Price list: ${error.message}`);
        }
    }
}