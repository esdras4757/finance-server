import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { Income } from './entities/income.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService],
  imports:[TypeOrmModule.forFeature([
    Income,
    User
  ])]
})
export class IncomeModule {}
