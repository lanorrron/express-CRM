import {IWorkspaceService} from "../domain/interfaces/services/workspace.service.interface";
import {CreateWorkspaceDto} from "../dtos/create.dto";
import {Request, Response} from "express"
import {sendError, sendSuccess} from "../../../shared/utils/responseHandlers";
import {GError} from "../../../shared/domain/entities/gError.entity";


export class WorkspaceController {
    constructor(protected workspaceService: IWorkspaceService) {
    }

    async createWorkspace(req: Request, res: Response): Promise<Response> {
        const user = (req as any).user
        const workspaceDto = new CreateWorkspaceDto(req.body)
        const {isValid, errors} = workspaceDto.validate()
        if (!isValid) {
            return res.status(400).json(sendError('validations errors', 400, errors ?? []))
        }

        try {
            const workspaceDtoWithAccount_id = {...workspaceDto, account_id:user.account_id}
            const workspaceCreated = await this.workspaceService.create(workspaceDtoWithAccount_id)
            return res.status(200).json(sendSuccess('workspace created', workspaceCreated))

        } catch (error) {
            if(error instanceof GError){
                return res.status(error.statusCode).json(sendError(error.message, error.statusCode, error.errors??[]))
            }
            return res.status(500).json(sendError('internal server error', 500, ))
        }
    }
}