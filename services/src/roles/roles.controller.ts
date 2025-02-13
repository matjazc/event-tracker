import { Controller, Get, Req } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getUserRole(@Req() request: Request) {
    const userRole = await this.rolesService.getRole(request);
    return { role: userRole };
  }
}
