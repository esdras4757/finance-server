import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Income } from 'src/income/entities/income.entity';
import { Expense } from 'src/expenses/entities/expense.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [
    TypeOrmModule.forFeature([
      Expense,
      Income,
    ])
  ]
})
export class DashboardModule {}
