import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
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

  async findAll({
    pagination,
    onlyActive = false,
  }: {
    pagination: PaginationDto;
    onlyActive?: boolean;
  }) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const totalPages = await this.product.count();
    const lastPage = Math.ceil(totalPages / limit);

    const data = await this.product.findMany({
      skip,
      take: limit,
      orderBy: {
        id: 'asc',
      },
      where: {
        active: onlyActive ? true : undefined,
      },
    });

    return {
      data,
      meta: {
        page,
        lastPage,
        totalPages,
      },
    };
  }

  async findOne(id: number) {
    const data = await this.product.findUnique({
      where: { id },
    });
    if (!data) {
      Logger.warn(`Product with id ${id} not found`, this.constructor.name);
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return data;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existProduct = await this.findOne(id); // Check if the product exists before updating

    if (!existProduct) {
      Logger.warn(`Product with id ${id} not found`, this.constructor.name);
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return await this.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const existProduct = await this.findOne(id); // Check if the product exists before deleting
    if (!existProduct) {
      Logger.warn(`Product with id ${id} not found`, this.constructor.name);
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return await this.product.update({
      data: { active: false },
      where: { id },
    });
  }
}
