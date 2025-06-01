import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Document } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<Document>,
  ) {
    super(userModel);
  }

  async checkEmailExits(documentValue: string): Promise<boolean> {
    const response = await this.userModel.exists({ email: documentValue });
    return response ? true : false;
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }
}
