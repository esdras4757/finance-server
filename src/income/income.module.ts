import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { Income } from './entities/income.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService],
  imports:[TypeOrmModule.forFeature([
    Income,
    User,
    Category
  ])]
})
export class IncomeModule {}
