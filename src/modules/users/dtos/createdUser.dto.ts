import {DTO} from "../../../shared/dtos/dto.model";
import {UserEntity} from "../domain/entities/user.entity";
import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";

export class CreatedUserDto extends DTO<UserEntity>{
    @IsString()
    @IsNotEmpty({message:'first_name es required'})
    first_name!: UserEntity['first_name']

    @IsString()
    @IsNotEmpty({message:'last_name is required'})
    last_name!: UserEntity['last_name']

    @IsString()
    @IsNotEmpty({message:'phone_number is required'})
    phone_number!: UserEntity['phone_number']

    @IsEmail()
    @IsNotEmpty({message:'email is required'})
    email!:UserEntity['email']

    @IsString()
    @IsNotEmpty({message:'password is required'})
    @MinLength(8,{message:'password must be at least 8 characters long'})
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Password must contain at least one letter and one number"
    })
    password!: UserEntity['password']

}