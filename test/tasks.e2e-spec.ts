import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TasksModule } from '../src/tasks/tasks.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../src/tasks/entities/task.entity';

describe('TasksController (e2e)', () => {
    let app: INestApplication;

    const tasksMock = [{
        id: Date.now(),
        title: 'Test 1',
        description: 'Task Test One',
        done: true
    }],
        taskMock = {
            title: 'Test 1',
            description: 'Task Test One',
            done: true
        };

    const mockTaskRepository = {
        find: jest.fn().mockResolvedValue(tasksMock),
        create: jest.fn().mockImplementation(dto => dto),
        save: jest.fn().mockImplementation(dto => Promise.resolve({ id: Date.now(), ...dto }))
    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TasksModule],
        }).overrideProvider(getRepositoryToken(Task)).useValue(mockTaskRepository).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/tasks (GET)', () => {
        return request(app.getHttpServer())
            .get('/tasks')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(tasksMock);
    });

    it('/tasks (POST)', () => {
        return request(app.getHttpServer())
            .post('/tasks')
            .send(taskMock)
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                expect(response.body).toEqual({
                    id: expect.any(Number),
                    ...taskMock
                })
            });
    });

    it('/tasks (POST) --> 400 on validation error', () => {
        return request(app.getHttpServer())
            .post('/tasks')
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
    });
});
