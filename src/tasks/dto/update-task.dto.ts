import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

import { createTransformParams } from '../../utils/util-dto';

export class UpdateTaskDto {
  @IsString()
  @Transform(createTransformParams)
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(255)
  text?: string;

  @IsBoolean()
  @IsOptional()
  isCheck?: boolean;
}
