import { ApiProperty } from '@nestjs/swagger';

import { BaseGroupItem } from 'src/group/docs';

export class GetAllGroupsResponseDto {
  @ApiProperty({ type: [BaseGroupItem] })
  myGroups: BaseGroupItem[];

  @ApiProperty({ type: [BaseGroupItem] })
  otherGroups: BaseGroupItem[];
}
