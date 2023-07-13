import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetGroupItemParamsDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  groupId: number;
}
