import {IAuthService} from "../domain/interfaces/auth.service.interface";
import {UserService} from "../../users/infrastructure/services/user.service";
import {UserRepository} from "../../users/infrastructure/respositories/user.repository";
import {compare} from 'bcrypt'
import {GError} from "../../../shared/domain/entities/gError.entity";
import {sign} from "jsonwebtoken";

export class AuthService implements IAuthService {
    private userService = new UserService(new UserRepository())

    async login(email: string, password: string): Promise<object> {
        const user = await this.userService.findOne({email});
        if (!user || !(await compare(password, user.password))) {
            throw new GError('Invalid credentials', 401)
        }
        const token = sign(user, process.env.JWT_SECRET!, {expiresIn: '1h'})
        const {password: _, ...userWithoutPassword} = user

        return Promise.resolve({token, user:userWithoutPassword});
    }
}