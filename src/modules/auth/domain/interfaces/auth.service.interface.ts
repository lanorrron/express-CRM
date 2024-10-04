export interface IAuthService {

    login(email: string, password: string): Promise<object>

    logout(userId: string):Promise<void>
}