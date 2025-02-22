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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
     { 
      type	: 'postgres',
      host  : process.env.DATABASE_URL,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [User, Expense],
      port: +process.env.PGPORT,
      ssl: true,
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
    DashboardModule
  ],
})
export class AppModule {}
