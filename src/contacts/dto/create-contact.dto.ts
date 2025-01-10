import { IsNumber, IsOptional, IsString } from "class-validator";
import { before } from "node:test";
import { BeforeInsert } from "typeorm";

export class CreateContactDto {
    @IsString()
    name?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    userId?: string;
}
