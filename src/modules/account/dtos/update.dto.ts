import {DTO} from "../../../shared/dtos/dto.model";
import {AccountEntity} from "../domain/entities/account.entity";
import {IsOptional, IsString, MinLength} from "class-validator";

export class  UpdateAccountDto extends DTO<AccountEntity>{

    @IsOptional()
    @IsString()
    @MinLength(5, {
        message: 'The name_organization must be at last 3 characters long',
    })
    name_organization?: AccountEntity['name_organization'];
}