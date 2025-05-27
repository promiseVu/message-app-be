import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { Conversation } from './schema/conversation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ConversationRepository extends BaseRepository<
  Conversation & Document
> {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Document>,
  ) {
    super(conversationModel);
  }
}
