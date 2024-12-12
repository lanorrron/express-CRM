import {IRoleService} from "../domain/interfaces/services/role.service.interface";
import {Request, Response} from 'express'
import {CreateRoleDto} from "../dtos/createRole.dto";
import {GError} from "../../../shared/domain/entities/gError.entity";
import {sendError, sendSuccess} from "../../../shared/utils/responseHandlers";
import {UpdateRoleDto} from "../dtos/updateRole.dto";

export class RoleController {
    constructor(private roleService: IRoleService) {
    }

    async createRole(req: Request, res: Response): Promise<Response> {
        try {
            const dtoRole = new CreateRoleDto(req.body)
            const {isValid, errors} = dtoRole.validate()
            if (!isValid) {
                throw new GError('Validations errors', 400, errors)
            }
            const createdRole = await this.roleService.create(dtoRole)
            return res.status(200).json(sendSuccess('Role created', createdRole))
        } catch (error) {
            if (error instanceof GError) {
                return res.status(error.statusCode).json(sendError(error.message, error.statusCode, error.errors))
            } else {
                return res.status(500).json(sendError('internal server error', 500))
            }
        }
    }

    async updateRoleById(req: Request, res: Response): Promise<Response> {
        const id = req.params.id
        if (!id) {
            return res.status(404).json(sendError('id not found', 404))
        }
        const dtoRole = new UpdateRoleDto(req.body)
        const {isValid, errors} = dtoRole.validate()
        if (!isValid) {
            return res.status(400).json(sendError('validations errors', 400, errors))
        }
        try {
            const roleUpdated = await this.roleService.updateById(id, dtoRole)
            return res.status(200).json(sendSuccess('role updated', {roleUpdated}))
        } catch (error) {
            if (error instanceof GError) {
                return res.status(error.statusCode).json(sendError(error.message, error.statusCode, error.errors ?? []))
            }
            return res.status(500).json(sendError('internal server error', 500))
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const id = req.params.id
        if (!id) {
            return res.status(403).json(sendError('id not found', 403))
        }
        try {
            await this.roleService.deleteById(id)
            return res.status(200).json(sendSuccess('role deleted'))
        } catch (error) {
            if(error instanceof GError){
                return res.status(error.statusCode).json(sendError(error.message, error.statusCode))
            }
            return res.status(500).json(sendError('internal server error',500))
        }
    }

    async getAll(req: Request, res:Response):Promise<Response>{
        const {where,order, attributes} = req.query
        const parsedWhere = where ? JSON.parse(where as string) : undefined;
        const parsedOrder = order ? JSON.parse(order as string) : undefined;
        const parsedAttributes = attributes ? JSON.parse(attributes as string) : undefined;

        try {
            const items = await this.roleService.findAll({where:parsedWhere, order:parsedOrder, attributes: parsedAttributes})
            return res.status(200).json(sendSuccess('list role', items))
        }
        catch (error){
            if(error instanceof GError){
                return res.status(error.statusCode).json(sendError(error.message, error.statusCode, error.errors??[]))
            }
            return res.status(500).json(sendError('internal server error', 500))
        }
    }
}