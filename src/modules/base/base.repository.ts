import { Injectable } from '@nestjs/common';

Injectable();
export class BaseRepository<T extends Document> {
  constructor(private readonly model: any) {}
  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }
  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }
  async create(data: Partial<T>): Promise<T> {
    const created = new this.model(data);
    return created.save();
  }
  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
