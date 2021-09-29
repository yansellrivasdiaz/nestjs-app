import { IsBoolean, IsNotEmpty } from "class-validator"

export class CreateTaskDto {
    @IsNotEmpty()
    title: string
    
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    @IsBoolean()
    done: boolean
}
