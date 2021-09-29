import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>){ }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task>|NotFoundException {
    try {
      const task = this.taskRepository.findOneOrFail(id);
      return task;
    } catch (error) {
      throw new NotFoundException(`Task does not exists with ID: ${id}`);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if(task instanceof Task){
      task.title = updateTaskDto.title;
      task.description = updateTaskDto.description;
      task.done = updateTaskDto.done;
  
      return this.taskRepository.save(task);
    }
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);
    if(task instanceof Task){
      return this.taskRepository.remove(task);
    }
  }
}
