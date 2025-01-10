import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      const user = await this.userRepository.findOne({
        where: { id: createCategoryDto.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }
      category.user = user;
      const result = await this.categoryRepository.save(category);
      return result;
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return this.categoryRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.categoryRepository.findOne({
        where: [{ categoryId: id }],
      });
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
      
    }
  }

  async findByUserId (userId: string) {
    try {
      return await this.categoryRepository.find({
        where: {
          user: {
            id: userId, // Se filtra por el id del usuario
          },
        },
        relations: ['user'], // Esto incluye la relación para acceder a la entidad User
      });
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
      
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne({
        where: [{ categoryId: id }],
      });

      if (!category) {
        throw new Error('Category not found');
      }

      await this.categoryRepository.update(id, updateCategoryDto);
      return await this.categoryRepository.findOne({
        where: [{ categoryId: id }],
      });
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: [{ categoryId: id }],
      });

      if (!category) {
        throw new Error('Category not found');
      }

      await this.categoryRepository.delete(id);
      return category;
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
