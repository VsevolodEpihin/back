import { HttpStatus } from '@nestjs/common';

export interface StatusHttp {
  status: typeof HttpStatus;
  message: string;
}
