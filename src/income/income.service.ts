import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import * as dayjs from 'dayjs'; 

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createIncomeDto: CreateIncomeDto) {
    try {
      const user= await this.userRepository.findOneBy({id: createIncomeDto.userId});
      if(!user){
        throw new NotFoundException('Usuario no encontrado');
      }
      delete user.password;
      const income = this.incomeRepository.create({
        ...createIncomeDto,
        user
      });

      const result = this.incomeRepository.save(income);

      if (result) {
        return {...createIncomeDto, ...user};
      }
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all expenses`;
  }

  async findByUserId (userId: string) {
    try {
      const result = await this.incomeRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
        order: { creation_date: 'DESC' }
      });

      const labelsExpenses = result.map(expense => 
        expense.creation_date ? dayjs(expense.creation_date).format('MM-DD-YYYY') : 'N/A'
    );
    const amountExpenses = result.map(expense => expense.amount);

    const totalIncomes = amountExpenses.reduce((acc, amount) => acc + amount, 0);

    const IncomesGraph = {
      labels: labelsExpenses,
      amounts: amountExpenses,
  };


    return {
      result,
      IncomesGraph,
      totalIncomes
    }
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
      
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} income`;
  }

  update(id: string, updateIncomeDto: UpdateIncomeDto) {
    try {
      const income = this.incomeRepository.update(id, updateIncomeDto);
      return income;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message
      );
    }
  }

  remove(id: string) {
    try {
      const income = this.incomeRepository.delete(id);
      return income;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
