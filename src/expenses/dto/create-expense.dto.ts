import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExpenseDto {
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

    @IsString()
    creation_date?: string;
}
