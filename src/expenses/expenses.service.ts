import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ExpensesService {

  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    try {
      const user= await this.userRepository.findOneBy({id: createExpenseDto.userId});
      if(!user){
        throw new NotFoundException('Usuario no encontrado');
      }
      delete user.password;
      const expense = this.expenseRepository.create({
        ...createExpenseDto,
        user
      });

      const result = this.expenseRepository.save(expense);

      if (result) {
        return {...createExpenseDto, ...user};
      }
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
  
  async findByUserId (userId: string) {
    try {
      return await this.expenseRepository.find({
        where: {
          user: {
            id: userId, // Se filtra por el id del usuario
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  findAll() {
    return `This action returns all expenses`;
  }

  findOne(id: string) {
    return `This action returns a #${id} expense`;
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    try {
      const expense = this.expenseRepository.update(id, updateExpenseDto);
      return expense;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message
      );
    }
  }

  remove(id: string) {
    try {
      const expense = this.expenseRepository.delete(id);
      return expense;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
