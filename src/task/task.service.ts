import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { Repository, FindOptionsWhere, Like } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ){}

    private tasks

    async create(task: TaskDto) {
          const taskToSave: Partial<TaskEntity> = this.mapDtoToEntity(task);
          
          const taskCreated = await this.taskRepository.save(taskToSave)

          return this.mapEntityToDto(taskCreated);
    }

    async findById(id: string): Promise<TaskDto> {
        const foundTask = await this.taskRepository.findOne({ where: {id} })

        if (!foundTask) {
            throw new HttpException(`Task id ${id} not found`, HttpStatus.NOT_FOUND)
        }

        return this.mapEntityToDto(foundTask)
    }

    async findAll(params: FindAllParameters): Promise<TaskDto[]> {
        const searchParams: FindOptionsWhere<TaskEntity> = {}

        if(params.title) {
            searchParams.title = Like(`%${params.title}%`)
        }

        if(params.status) {
            searchParams.status = Like(`%${params.status}%`)
        }

        const tasksFound = await this.taskRepository.find({ where: searchParams })

        return tasksFound.map(task => this.mapEntityToDto(task))
    }

    async update(id: string, task: TaskDto) {
        const foundTask = await this.taskRepository.findOne({where: { id }})

        if(!foundTask) {
            throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST)
        }

        return await this.taskRepository.update(id, this.mapDtoToEntity(task))
    }

    async remove(id: string) {
        const result = await this.taskRepository.delete(id)
        
        if(!result.affected) {
            throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST)
        }
        
    }

    private mapDtoToEntity(taskDto: TaskDto): Partial<TaskEntity> {
        return {
            title: taskDto.title,
            description: taskDto.description,
            expirationDate: taskDto.expirationDate,
            status: taskDto.status ? taskDto.status.toString() : TaskStatusEnum.TO_DO
        }
    }

    private mapEntityToDto(taskEntity: TaskEntity): TaskDto {
        return {
            id: taskEntity.id,
            title: taskEntity.title,
            description: taskEntity.description,
            expirationDate: taskEntity.expirationDate,
            status: TaskStatusEnum[taskEntity.status]
        }
    }
}
