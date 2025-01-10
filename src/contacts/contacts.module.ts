import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports:[
    TypeOrmModule.forFeature([
      Contact,
      User
    ])
  ],
})
export class ContactsModule {}
