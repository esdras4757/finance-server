import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  imports:[TypeOrmModule.forFeature([
    Expense,
    User,
    Category
  ])],
})
export class ExpensesModule {}
