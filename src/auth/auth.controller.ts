import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

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

  @Get('user/:id')
  private async findUserById(@Param() { id }: DTO.FindUserByIdRequestDto) {
    return await this.service.findUserById({ id });
  }

  @Get('users')
  private async findAllUsers(@Param() payload: DTO.FindAllUsersRequestDto) {
    return await this.service.findAllUsers(payload);
  }

  @Patch('user/:id/activate')
  private async activateUserById(@Param() { id }: DTO.ActivateUserByIdRequestDto) {
    await this.service.activateUserById({ id });

    return null;
  }

  @Patch('user/:id/deactivate')
  private async deactivateUserById(@Param() { id }: DTO.DeactivateUserByIdRequestDto) {
    await this.service.deactivateUserById({ id });

    return null;
  }

  @Delete('user/:id')
  private async removeUserById(@Param() { id }: DTO.RemoveUserByIdRequestDto) {
    await this.service.removeUserById({ id });

    return null;
  }

  @Put('user/:id/roles')
  private async addRoleToUser(
    @Param() { id }: DTO.AddRoleToUserRequestParamsDto,
    @Body() { role }: DTO.AddRoleToUserRequestBodyDto,
  ) {
    await this.service.addRoleToUser({ id, role });

    return null;
  }

  @Delete('user/:id/roles')
  private async removeRoleFromUser(
    @Param() { id }: DTO.RemoveRoleFromUserRequestParamsDto,
    @Body() { role }: DTO.RemoveRoleFromUserRequestBodyDto,
  ) {
    await this.service.removeRoleFromUser({ id, role });

    return null;
  }
}
