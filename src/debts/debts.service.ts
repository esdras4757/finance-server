import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DebtsService {

  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>

  ) {}

  async create(createDebtDto: CreateDebtDto) {
    try {
      const user = await this.userRepository.findOneBy({ id: createDebtDto.userId });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
  
      const category = createDebtDto.categoryId
      ? await this.categoryRepository.findOneBy({ categoryId: createDebtDto.categoryId })
      : null;
  
      const contact = await this.contactRepository.findOneBy({ contactId: createDebtDto.contactId });
      if (!contact) {
        throw new NotFoundException('Contacto no encontrado');
      }
  
      // Crear nueva instancia de Debt
      const { userId, categoryId, contactId, ...rest } = createDebtDto;
  
      const debt = this.debtRepository.create({
        ...rest,
        user,
        category,
        contact,
        debtId: undefined, // Aseguramos que no hay ID
      });
  
      console.log('Objeto Debt a guardar:', debt);
  
      // Guardar en la base de datos
      const result = await this.debtRepository.save(debt);
  
      return { ...result };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByUserId (userId: string, type: string) {
    try {
      return await this.debtRepository.find({
        where: {
          user: {
            id: userId,
          },
          type: type,
        },
        relations: ['category', 'contact'],
      });
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
      
    }
  }
  

  findAll() {
    return `This action returns all debts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debt`;
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return `This action updates a #${id} debt`;
  }

  async remove(id: string) {
    try {
      const result = await this.debtRepository.delete(id);
      return true;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);  
    }
}

}
