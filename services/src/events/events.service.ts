import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { RolesService } from '../roles/roles.service';

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

    if (typeof createEventDto.eventId !== 'number') {
      throw new BadRequestException('Id must be an integer.');
    }

    try {
      return await this.databaseService.event.create({
        data: createEventDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new HttpException(
          `Event with ID ${createEventDto.eventId} already exists.`,
          HttpStatus.CONFLICT,
        );
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid data provided.');
      }

      throw new HttpException(
        'An unexpected error occurred while creating the event.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

    if (typeof updateEventDto.eventId !== 'number') {
      throw new BadRequestException('Id must be an integer.');
    }

    try {
      return await this.databaseService.event.update({
        where: {
          id,
        },
        data: updateEventDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new HttpException(
          `Event with ID ${updateEventDto.eventId} already exists.`,
          HttpStatus.CONFLICT,
        );
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid data provided.');
      }

      throw new HttpException(
        'An unexpected error occurred while creating the event.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    return this.databaseService.event.delete({
      where: {
        id,
      },
    });
  }
}
