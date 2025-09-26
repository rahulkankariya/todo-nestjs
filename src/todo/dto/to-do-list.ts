import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TodoListDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
