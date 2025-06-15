import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import {
  Conversation,
  ConversationDocument,
} from './schema/conversation.schema';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ConversationRepository extends BaseRepository<ConversationDocument> {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<ConversationDocument>,
  ) {
    super(conversationModel);
  }

  async getConversationByUser(userId: string): Promise<Conversation[]> {
    return await this.conversationModel
      .find({
        members: { $elemMatch: { user: userId } },
      })
      .exec();
  }
}
