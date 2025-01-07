import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
     { 
      type	: 'postgres',
      host  : 'dpg-ctupo1dumphs73a04720-a.oregon-postgres.render.com',
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      port: 5432,
      ssl: true,
      autoLoadEntities: true,
      synchronize: true,
    }
    ),
    UsersModule
  ],
})
export class AppModule {}
