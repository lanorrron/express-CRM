import {DTO} from "../../../shared/dtos/dto.model";
import {RoleEntity} from "../domain/entities/role.entity";
import {IsString, MaxLength} from "class-validator";

export class CreateRoleDto extends DTO<RoleEntity>{
    @IsString()
    @MaxLength(10,{message:"role name must not exceed 10 characters."})
    name!: RoleEntity['name']
}