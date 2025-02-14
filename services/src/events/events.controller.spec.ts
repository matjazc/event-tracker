import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { RolesService } from '../roles/roles.service';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;

  const mockEventsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
        {
          provide: DatabaseService,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: RolesService,
          useValue: {
            getRole: jest.fn(),
          },
        },
      ],
    }).compile();

    eventsController = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(eventsController).toBeDefined();
  });

  describe('create', () => {
    it('should call eventsService.create with correct arguments', async () => {
      const createEventDto: Prisma.EventCreateInput = {
        eventId: 1,
        name: 'string',
        description: 'string',
        type: 'ADS',
        priority: 1,
      };
      const mockRequest: any = { id: 1 };
      mockEventsService.create.mockResolvedValue({ id: 1, ...createEventDto });

      const result = await eventsController.create(createEventDto, mockRequest);

      expect(eventsService.create).toHaveBeenCalledWith(
        createEventDto,
        mockRequest,
      );
      expect(result).toEqual({ id: 1, ...createEventDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const result = [{ id: 1, name: 'Event 1' }];
      mockEventsService.findAll.mockResolvedValue(result);

      const response = await eventsController.findAll();

      expect(eventsService.findAll).toHaveBeenCalled();
      expect(response).toBe(result);
    });
  });

  describe('update', () => {
    it('should call eventsService.update with correct arguments', async () => {
      const id = '1';
      const updateEventDto: Prisma.EventUpdateInput = {
        name: 'Updated Event',
      };
      const mockRequest: any = { user: { id: 1 } };
      mockEventsService.update.mockResolvedValue({ id: 1, ...updateEventDto });

      const result = await eventsController.update(
        id,
        updateEventDto,
        mockRequest,
      );

      expect(eventsService.update).toHaveBeenCalledWith(
        +id,
        updateEventDto,
        mockRequest,
      );
      expect(result).toEqual({ id: 1, ...updateEventDto });
    });
  });

  describe('remove', () => {
    it('should call eventsService.remove with correct id', async () => {
      const id = '1';
      mockEventsService.remove.mockResolvedValue({ id: 1 });

      const result = await eventsController.remove(id);

      expect(eventsService.remove).toHaveBeenCalledWith(+id);
      expect(result).toEqual({ id: 1 });
    });
  });
});
