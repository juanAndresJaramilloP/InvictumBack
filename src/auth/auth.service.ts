import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import constants from '../shared/security/constants';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.contrasena === password) {
            const { contrasena, ...result } = user;
            return result;
        }
        return null;
    }

    async login(req: any) {
        const payload = { username: req.user.correo, sub: req.user.id, rol: req.user.rol };
        console.log('payload', payload);
        return {
            token: this.jwtService.sign(payload, { privateKey: constants.JWT_SECRET, expiresIn:constants.JWT_EXPIRES_IN }),
        };
    }
}
