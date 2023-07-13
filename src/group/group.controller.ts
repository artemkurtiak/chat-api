import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GroupService } from './group.service';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Ctx } from 'src/auth/decorators/ctx.decorator';

import { CreateGroupBodyDto } from './dtos/body/create-group.body-dto';
import { GetGroupItemParamsDto } from './dtos/params/get-group-item.params-dto';
import { GetAllGroupsResponseDto } from './dtos/response/get-all-groups.response-dto';

import { ExtendedGroupItem } from './docs';

@Controller('/group')
@Auth()
@ApiTags('Group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Successful group creation',
  })
  @ApiConflictResponse({
    description: 'Group with provided name already exists',
  })
  @ApiOperation({
    summary: 'Create group',
  })
  createGroup(@Ctx('userId') userId: number, @Body() body: CreateGroupBodyDto) {
    return this.groupService.createGroup(userId, body);
  }

  @Get('/all')
  @ApiOkResponse({
    description: 'Successfull getting of all groups',
    type: GetAllGroupsResponseDto,
  })
  @ApiOperation({ summary: 'Get all groups' })
  getAllGroups(@Ctx('userId') userId: number) {
    return this.groupService.getAllGroups(userId);
  }

  @Get('/:groupId')
  @ApiOkResponse({
    description: 'Successful group getting',
    type: [ExtendedGroupItem],
  })
  @ApiForbiddenResponse({
    description: 'Access to group denied, join first',
  })
  @ApiNotFoundResponse({
    description: 'Group not found',
  })
  @ApiOperation({ summary: 'Get group item' })
  getGroup(@Param() params: GetGroupItemParamsDto, @Ctx('userId') userId: number) {
    return this.groupService.getGroup(params.groupId, userId);
  }

  @Post('/:groupId/join')
  @ApiCreatedResponse({
    description: 'Successful group joinment',
  })
  @ApiConflictResponse({
    description: 'You are already a participant of group',
  })
  @ApiOperation({
    summary: 'Join group',
  })
  joinGroup(@Param() params: GetGroupItemParamsDto, @Ctx('userId') userId: number) {
    return this.groupService.joinGroup(params.groupId, userId);
  }

  @Post('/:groupId/leave')
  @ApiCreatedResponse({
    description: 'Successful group leaving',
  })
  @ApiNotFoundResponse({
    description: 'You are not participant of that group',
  })
  @ApiOperation({
    summary: 'Leave group',
  })
  leaveGroup(@Param() params: GetGroupItemParamsDto, @Ctx('userId') userId: number) {
    return this.groupService.leaveGroup(params.groupId, userId);
  }
}
