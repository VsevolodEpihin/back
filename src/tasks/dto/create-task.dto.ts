import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Matches(/^[^"№%:?*]+$/)
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @MaxLength(255)
  text: string;
}
