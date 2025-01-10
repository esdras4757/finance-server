import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly expenseRepository: Repository<Income>,
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
      const income = this.expenseRepository.create({
        ...createIncomeDto,
        user
      });

      const result = this.expenseRepository.save(income);

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

  findOne(id: string) {
    return `This action returns a #${id} income`;
  }

  update(id: string, updateIncomeDto: UpdateIncomeDto) {
    try {
      const income = this.expenseRepository.update(id, updateIncomeDto);
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
      const income = this.expenseRepository.delete(id);
      return income;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
