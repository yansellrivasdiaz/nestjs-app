import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const taskData = {
    title: 'Test 1',
    description: 'Task Test One',
    done: true
  }

  const mockTaskRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(dto => Promise.resolve({id: Date.now(),...dto}))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, {
        provide: getRepositoryToken(Task),
        useValue: mockTaskRepository
      }],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should create a new record and return that', async () => {
    expect(await service.create(taskData)).toEqual({
      id: expect.any(Number),
      ...taskData
    });
  });
});
