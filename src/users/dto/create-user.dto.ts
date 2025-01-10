import { IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(3)
    lastName: string;

    @IsString()
    @MinLength(3)
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
