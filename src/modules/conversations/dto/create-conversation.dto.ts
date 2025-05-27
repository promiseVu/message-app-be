import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MemberDto } from './member.dto';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MemberDto)
  members: MemberDto[];
}
