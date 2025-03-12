import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/expenses/entities/expense.entity';
import { Income } from 'src/income/entities/income.entity';
import { Debt } from 'src/debts/entities/debt.entity';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    TypeOrmModule.forFeature([
      Expense,
      Income,
      Debt,
    ])
  ]
})
export class TransactionsModule {}
