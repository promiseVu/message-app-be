import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { MessageDocument, Message } from './schema/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
Injectable();
export class MessageRepository extends BaseRepository<MessageDocument> {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {
    super(messageModel);
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    return await this.messageModel
      .find({ conversation: conversationId })
      .sort({ order: 1 })
      .exec();
  }
}
