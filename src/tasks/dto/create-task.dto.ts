import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { createTransformParams } from '../../utils/util-dto';

export class CreateTaskDto {
  @IsString()
  @Transform(createTransformParams)
  @IsNotEmpty()
  @MaxLength(255)
  text: string;
}
