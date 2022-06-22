import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { Post, Put, Body, Param, Controller, Inject } from '@nestjs/common/decorators';

import * as DTO from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/services/auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  private async register(@Body() payload: DTO.RegisterRequestDto) {
    return await this.service.register(payload);
  }

  @Put('login')
  private async login(@Body() payload: DTO.LoginRequestDto) {
    const token = await this.service.login(payload);
    return { token };
  }

  @Put('user/:id/validate-token')
  private async validate(@Param() { id }: { id: string }, @Body() payload: DTO.ValidateRequestDto) {
    try {
      const user = await this.service.validate(payload);
      return String(user._id) === id;
    } catch (err) {
      if (err instanceof NotFoundException || err instanceof ForbiddenException) {
        return false;
      }
    }
  }
}
