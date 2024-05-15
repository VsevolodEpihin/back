import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

import { createTransformParams } from '../../utils/util-dto';
export class UpdateTaskDto {
  @IsString()
  @Matches(/^ *[^ ].*$/)
  @Transform(createTransformParams)
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(255)
  text?: string;

  @IsBoolean()
  @IsOptional()
  isCheck?: boolean;
}
