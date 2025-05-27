import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: false })
  isGroup: boolean;

  @Prop({
    type: [
      {
        _id: false,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
  })
  members: { userId: string; joinedAt: Date }[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
