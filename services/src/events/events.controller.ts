import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(
    @Body() createEventDto: Prisma.EventCreateInput,
    @Req() request: Request,
  ) {
    return this.eventsService.create(createEventDto, request);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: Prisma.EventUpdateInput,
    @Req() request: Request,
  ) {
    return this.eventsService.update(+id, updateEventDto, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
