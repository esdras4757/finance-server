import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs'; 

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
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createDebtDto: CreateDebtDto) {
    try {
      const user = await this.userRepository.findOneBy({
        id: createDebtDto.userId,
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const category = createDebtDto.categoryId
        ? await this.categoryRepository.findOneBy({
            categoryId: createDebtDto.categoryId,
          })
        : null;

      const contact = await this.contactRepository.findOneBy({
        contactId: createDebtDto.contactId,
      });
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

  async findByUserId(userId: string, type: string) {
    try {
      const result = await this.debtRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['category', 'contact'],
        order: { isPaid: 'ASC', creation_date: 'DESC' },
      });

      const resultFilteredNotPaid = result.filter((debt) => debt.type === type && debt.isPaid === false);
      const resultFilteredPaid = result.filter((debt) => debt.type === type);

      console.log('Debts filtered:', resultFilteredNotPaid);

      const labelsDebts = resultFilteredNotPaid.map((expense) =>
        expense.creation_date
          ? dayjs(expense.creation_date).format('MM-DD-YYYY')
          : 'N/A',
      );
      const amountDebts = resultFilteredNotPaid.map((expense) => expense.amount);

      const DebtsGraph = {
        labels: labelsDebts,
        amounts: amountDebts,
      };

      const totalDebts = amountDebts.reduce((acc, amount) => acc + amount, 0);

      return {
        result:resultFilteredPaid,
        DebtsGraph,
        totalDebts
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async incrementDebt(id: string, updateDebtDto: UpdateDebtDto) {
    try {
      const debt = await this.debtRepository.findOne({
        where: { debtId: id }
      });
      if (!debt) {
        throw new NotFoundException('Deuda no encontrada');
      }

      const updatedDebt = this.debtRepository.merge(debt, updateDebtDto);

      return this.debtRepository.save(updatedDebt);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);  
    }
  }

 async decrementDebt(id: string, updateDebtDto: UpdateDebtDto) {
    try {
      const debt = await this.debtRepository.findOne({
        where: { debtId: id }
      });
      if (!debt) {
        throw new NotFoundException('Deuda no encontrada');
      }

      const updatedDebt = this.debtRepository.merge(debt, updateDebtDto);

      return this.debtRepository.save(updatedDebt);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    } 
  }

  findAll() {
    return `This action returns all debts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debt`;
  }

 async update(id: string, updateDebtDto: UpdateDebtDto) {
    try {
      const debt = await this.debtRepository.findOne({
        where: { debtId: id }
      });
      if (!debt) {
        throw new NotFoundException('Deuda no encontrada');
      }

      const updatedDebt = this.debtRepository.merge(debt, updateDebtDto);

      return this.debtRepository.save(updatedDebt);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.debtRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
