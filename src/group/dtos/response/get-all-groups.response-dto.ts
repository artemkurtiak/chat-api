import { ApiProperty } from '@nestjs/swagger';

import { BaseGroupItem } from 'src/group/docs';

import { GroupEntity } from 'src/group/entities/group.entity';

export class GetAllGroupsResponseDto {
  @ApiProperty({ type: [BaseGroupItem] })
  myGroups: BaseGroupItem[];

  @ApiProperty({ type: [BaseGroupItem] })
  otherGroups: BaseGroupItem[];
}
