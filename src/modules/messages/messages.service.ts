import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { MessageRepository } from './message.repository';
import { Message } from './schema/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService extends BaseService<
  Message,
  CreateMessageDto,
  any
> {
  constructor(private readonly messageRepository: MessageRepository) {
    super(messageRepository);
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    return await this.messageRepository.getConversationMessages(conversationId);
  }
}
