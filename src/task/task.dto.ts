import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export enum TaskDtoStatusEnum{
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}
export class TaskDto{
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string;

    @IsString()
    @MinLength(5)
    @MaxLength(512)
    description: string;

    @IsEnum(TaskDtoStatusEnum)
    @IsOptional()
    status: string;

    @IsDateString()
    expirationDate: Date
}

export interface FindAllParameters {
    title: string;
    status: string;
}