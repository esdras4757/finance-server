import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Debt } from './entities/debt.entity';
import { Contact } from 'src/contacts/entities/contact.entity';

@Module({
  controllers: [DebtsController],
  providers: [DebtsService],
  imports:[
    TypeOrmModule.forFeature([
      Debt,
      Category,
      User,
      Contact
    ])
  ],
})
export class DebtsModule {}
