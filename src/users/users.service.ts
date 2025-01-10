import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new UnauthorizedException('User already exists');
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll() {
    try {
      return  await this.userRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error fetching users'); 
    }
  }

  async findOne(id: string) {
    try { 
      return await this.userRepository.findOne({
        where: [{ id: id }],
      });

    } catch (error) {
      console.log(error);
      
      throw new InternalServerErrorException('Error fetching user');
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email, password }, // Condición de búsqueda
      });

      console.log(user);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      delete user.password;
      // Continúa con la lógica de login si el usuario existe
      return { message: 'Login successful', user };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        // Si es una excepción no autorizada, la volvemos a lanzar
        throw error;
      }
      // Si es otro tipo de error, lanzamos un InternalServerError
      throw new InternalServerErrorException('Error logging in user');
    }
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
