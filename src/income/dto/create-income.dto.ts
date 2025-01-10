import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateIncomeDto {
    @IsString()
    @IsOptional()
    concept?: string;

    @IsNumber()
    amount: number;

    @IsString()
    @IsOptional()
    category?: string;

    @IsString()
    userId: string;
}
