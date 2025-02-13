import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RolesModule } from 'src/roles/roles.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [DatabaseModule, RolesModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
