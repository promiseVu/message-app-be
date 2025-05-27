import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<TModel, TCreateDto, TUpdateDto> {
  constructor(private readonly repository: any) {}

  async findAll(): Promise<TModel[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<TModel | null> {
    return await this.repository.findById(id);
  }

  async create(data: TCreateDto): Promise<TModel> {
    return await this.repository.create(data);
  }

  async update(id: string, data: TUpdateDto): Promise<TModel | null> {
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<TModel | null> {
    return await this.repository.delete(id);
  }
}
