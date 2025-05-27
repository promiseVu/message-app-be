import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    // Constructor logic if needed
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() userData: CreateUserDto) {
    return await this.usersService.create(userData);
  }

  @Put(':id')
  async update(@Body() userData: UpdateUserDto, @Param('id') id: string) {
    return await this.usersService.update(id, userData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }
}
