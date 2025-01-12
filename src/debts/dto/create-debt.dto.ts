import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDebtDto {
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
    contactId: string;

    @IsString()
    @IsEnum(["to-pay", "to-receive"])
    type: string;

    @IsString()
    @IsOptional()
    creation_date?: string;
}
