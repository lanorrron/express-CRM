import {DTO} from "../../../shared/dtos/dto.model";
import {AccountEntity} from "../domain/entities/account.entity";
import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateAccountDto extends DTO<AccountEntity>{
    @IsString()
    @IsNotEmpty({message:'name_organization is required'})
    @MinLength(3,{message:'name_organization must be as last 3 characters long'})
    name_organization!: AccountEntity['name_organization']
}