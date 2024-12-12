import {DTO} from "../../../shared/dtos/dto.model";
import {RoleEntity} from "../domain/entities/role.entity";
import {IsString} from "class-validator";

export class UpdateRoleDto extends DTO<RoleEntity>{
     @IsString()
     name! : RoleEntity['name']
}