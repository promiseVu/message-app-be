import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Conversation } from './schema/conversation.schema';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ConversationRepository } from './conversations.repository';
import { MessageRepository } from '../messages/message.repository';

@Injectable()
export class ConversationsService extends BaseService<
  Conversation,
  CreateConversationDto,
  UpdateConversationDto
> {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly messageRepository: MessageRepository,
  ) {
    super(conversationRepository);
  }

  async getConversationByUser(
    userId: string,
  ): Promise<(Conversation & { unreadCount: number })[]> {
    const conversations =
      this.conversationRepository.getConversationByUser(userId);
    const conversationWithUnreadCount = await Promise.all(
      (await conversations).map(async (conversation) => {
        const unreadCount = await this.messageRepository.getUnreadMessages(
          conversation._id.toString(),
          userId,
        );
        return { ...conversation.toObject(), unreadCount };
      }),
    );
    return conversationWithUnreadCount;
  }
}
