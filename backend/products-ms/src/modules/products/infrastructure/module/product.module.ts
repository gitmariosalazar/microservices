import { Module } from '@nestjs/common';
import { ProductController } from '../controller/product.controller';
import { ProductUseCaseService } from '../../application/services/product.use-case.service';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { ProductRepositoryPrismaImplementation } from '../repositories/prisma/repository/prisma.product.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductUseCaseService,
    PrismaService,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryPrismaImplementation,
    },
  ],
})
export class ProductModuleUsingPrisma {}
