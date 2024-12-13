import {DTO} from "../../../shared/dtos/dto.model";
import {WorkspaceEntity} from "../domain/entities/workspace.entity";
import {IsString, MinLength} from "class-validator";

export class CreateDto extends DTO<WorkspaceEntity> {

    @IsString()
    @MinLength(3,{message:"name workspace must be at least 3 characters long"})
    name!  : WorkspaceEntity['name']
}