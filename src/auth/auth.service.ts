import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService
  ) {}

  findAll() {
    return `This action returns all auth`;
  }

  findOne(email: string) {
    console.log(email);
    return `This action returns a #${email} auth`;
  }

  login(createAuthDto: CreateAuthDto) {
    return this.usersService.login(createAuthDto.email, createAuthDto.password);
  }
  
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

}
