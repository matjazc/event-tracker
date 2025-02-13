import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly rolesService: RolesService,
  ) {}

  private async checkRolePermission(request: Request, eventType: string) {
    const role = await this.rolesService.getRole(request);

    if (role === 'USER' && eventType === 'ADS') {
      throw new HttpException(
        'Access denied: You are not authorized to perform this action.',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async create(createEventDto: Prisma.EventCreateInput, request: Request) {
    await this.checkRolePermission(request, createEventDto.type);

    return this.databaseService.event.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return this.databaseService.event.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async update(
    id: number,
    updateEventDto: Prisma.EventUpdateInput,
    request: Request,
  ) {
    const updateEventType = updateEventDto.type as string;
    await this.checkRolePermission(request, updateEventType);

    return this.databaseService.event.update({
      where: {
        id,
      },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.event.delete({
      where: {
        id,
      },
    });
  }
}
