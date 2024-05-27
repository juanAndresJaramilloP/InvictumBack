import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {

    constructor(private readonly authService: AuthService){}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('validate')
    validateUser(@Req() req) {
        return {
            id: req.user.userId,
            username: req.user.username, // Este es el email
            name: req.user.name,
            role: req.user.role
        };
    }
    

}
