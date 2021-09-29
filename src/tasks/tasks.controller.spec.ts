import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  const taskData = {
    title: 'Test 1',
    description: 'Task Test One',
    done: true
  }

  const mockTaskService = {    
    findAll: jest.fn(() => {
      return [{
        id: Date.now(),
        ...taskData
      }]
    }),
    findOne: jest.fn( id => {
      return [{
        id,
        ...taskData
      }]
    }),
    create: jest.fn( dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),
    update: jest.fn( (id, dto) => {
      return {
        id,
        ...dto
      }
    }),
    remove: jest.fn( id => {
      return {
        id,
        ...taskData
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).overrideProvider(TasksService).useValue(mockTaskService).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create Task', () => {
    expect(controller.create(taskData)).toEqual({
      id: expect.any(Number),
      ...taskData
    });

    expect(mockTaskService.create).toHaveBeenCalled();
  });
  
  it('should update Task', () => {
    const id = Date.now();

    expect(controller.update(id.toString(),{
      id,
      ...taskData
    })).toEqual({
      id: expect.any(Number),
      ...taskData
    });

    expect(mockTaskService.update).toHaveBeenCalled();
  });
  
  it('should delete Task', () => {
    const id = Date.now();

    expect(controller.remove(id.toString())).toEqual({
      id: expect.any(Number),
      ...taskData
    });

    expect(mockTaskService.remove).toHaveBeenCalled();
  });
  
  it('should get all Task', () => {
    expect(controller.findAll()).toEqual([{
      id: expect.any(Number),
      ...taskData
    }]);

    expect(mockTaskService.findAll).toHaveBeenCalled();
  });
  
  it('should get one Task', () => {
    const id = Date.now();
    expect(controller.findOne(id.toString())).toEqual([{
      id,
      ...taskData
    }]);

    expect(mockTaskService.findOne).toHaveBeenCalled();
  });

});
