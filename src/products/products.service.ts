import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    Logger.log('Prisma Client is connected...', this.constructor.name);
    this.$connect();
  }

  async create(createProductDto: CreateProductDto) {
    const productInserted = await this.product.create({
      data: createProductDto,
    });
    Logger.log('Product inserted successfully!', this.constructor.name);
    return productInserted;
  }

  async findAll() {
    return await this.product.findMany({});
  }

  async findOne(id: number) {
    return await this.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.product.delete({
      where: { id },
    });
  }
}
