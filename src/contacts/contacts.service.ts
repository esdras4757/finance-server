import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { In, Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}


  async create(createContactDto: CreateContactDto) {
    try {

      const existingContact = await this.contactRepository.findOne({
        where: {
          email: createContactDto.email,
          phone: createContactDto.phone,
        },
      });
      
  
      // Si el contacto ya existe, lanzar un error
      if (existingContact) {
        throw new Error('El contacto ya existe con el mismo email y teléfono');
      }

      const contact = this.contactRepository.create(createContactDto);
      const user = await this.userRepository.findOne({
        where: { id: createContactDto.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }
      contact.user = user;
      const result = await this.contactRepository.save(contact);
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    try {
      return this.contactRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id:string) {
    try {
      return await this.contactRepository.findOne({
        where: { contactId: id },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
  }
}

  async findByUserId(id: string) {
    try {
      return await this.contactRepository.find({
        where: {
          user: {
            id: id, // Se filtra por el id del usuario
          },
        },
        relations: ['user'], // Esto incluye la relación para acceder a la entidad User
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
  

  update(id: string, updateContactDto: UpdateContactDto) {
    try {
      
      const contact = this.contactRepository.update(id, updateContactDto);
      return contact;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
      
    }
  }

  remove(id: string) {
    try {
      const contact = this.contactRepository.delete(id);
      return contact;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    } 
  }
}
