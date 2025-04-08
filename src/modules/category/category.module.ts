import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../domain/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]), // Correctamente configurado
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService], // Recomendado exportar si otros módulos lo usarán
})
export class CategoryModule {}