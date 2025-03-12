import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateIncomeDto {
    @IsString()
    @IsOptional()
    concept?: string;

    @IsNumber()
    amount: number;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsString()
    userId: string;

    @IsString()
    creation_date?: string;
}
