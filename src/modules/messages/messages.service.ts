import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { MessageRepository } from './message.repository';
import { Message } from './schema/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { Types } from 'mongoose';
import { ConversationsService } from '../conversations/conversations.service';

@Injectable()
export class MessagesService extends BaseService<
  Message,
  CreateMessageDto,
  any
> {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly conversationsService: ConversationsService,
  ) {
    super(messageRepository);
  }

  async create(data: CreateMessageDto): Promise<Message> {
    const message = await this.messageRepository.create({
      ...data,
      sender: new Types.ObjectId(data.sender),
      reply: data.reply ? new Types.ObjectId(data.reply) : undefined,
      readStatus: [
        {
          userId: new Types.ObjectId(data.sender),
          readAt: new Date(),
        },
      ],
    });
    if (message) {
      await this.conversationsService.update(data.conversation, {
        lastMessage: message._id as string,
      });
    }
    return message;
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    return await this.messageRepository.getConversationMessages(conversationId);
  }

  async updateReadStatus(conversationId: string, userId: string) {
    return await this.messageRepository.updateReadStatus(
      conversationId,
      userId,
    );
  }
}
