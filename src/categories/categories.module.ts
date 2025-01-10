import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports:[
    TypeOrmModule.forFeature([
      Category,
      User
    ])
  ],
})
export class CategoriesModule {}
