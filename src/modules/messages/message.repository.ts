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

  async getUnreadMessages(
    conversationId: string,
    userId: string,
  ): Promise<number> {
    return await this.messageModel
      .countDocuments({
        conversation: conversationId,
        'readStatus.userId': { $ne: userId },
        sender: { $ne: userId },
      })
      .exec();
  }

  async updateReadStatus(conversationId: string, userId: string) {
    const filter = {
      conversation: { $eq: conversationId },
      'readStatus.userId': { $ne: userId },
    };
    const update = {
      $push: {
        readStatus: {
          userId: userId,
          readAt: new Date(),
        },
      },
    };

    const response = await this.messageModel.updateMany(filter, update).exec();
    return {
      matchedCount: response.matchedCount,
      modifiedCount: response.modifiedCount,
    };
  }
}
