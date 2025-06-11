import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { BaseService } from '../base/base.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private readonly userRepository: UsersRepository) {
    super(userRepository);
  }

  override async create(data: CreateUserDto): Promise<User> {
    const emailIsExits = await this.userRepository.checkEmailExits(data.email);
    if (emailIsExits) {
      throw new BadRequestException('Email đã tồn tại');
    }
    return await this.userRepository.create(data);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }
}
