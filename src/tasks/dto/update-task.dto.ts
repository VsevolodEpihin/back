import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @Matches(/^ *[^ ].*$/)
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(255)
  text?: string;

  @IsBoolean()
  @IsOptional()
  isCheck?: boolean;
}
