import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Conversation } from './schema/conversation.schema';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ConversationRepository } from './conversations.repository';

@Injectable()
export class ConversationsService extends BaseService<
  Conversation,
  CreateConversationDto,
  UpdateConversationDto
> {
  constructor(private readonly conversationRepository: ConversationRepository) {
    super(conversationRepository);
  }
}
