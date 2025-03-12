import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { User } from './users/entities/user.entity';
import { Expense } from './expenses/entities/expense.entity';
import { IncomeModule } from './income/income.module';
import { ContactsModule } from './contacts/contacts.module';
import { CategoriesModule } from './categories/categories.module';
import { DebtsModule } from './debts/debts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
     { 
      type	: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Expense],
      autoLoadEntities: true,
      synchronize: true,
    }
    ),
    UsersModule,
    AuthModule,
    ExpensesModule,
    IncomeModule,
    ContactsModule,
    CategoriesModule,
    DebtsModule,
    DashboardModule,
    TransactionsModule
  ],
})
export class AppModule {}
