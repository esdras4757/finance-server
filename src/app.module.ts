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
      host  : 'ep-jolly-breeze-a8ojzh8h-pooler.eastus2.azure.neon.tech',
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      entities: [User, Expense],
      port: 5432,
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
