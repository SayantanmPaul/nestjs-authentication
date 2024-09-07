import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Post Signup
  @Post('signup')
  async signUp(@Body() signupData: SignUpDto) {
    return this.authService.signup(signupData);
  }

  //Post Login

  //Post Refresh token
}
