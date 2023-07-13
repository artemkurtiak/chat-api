import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OnMessageBodyDto {
  groupId: number;
  text: string;
}
