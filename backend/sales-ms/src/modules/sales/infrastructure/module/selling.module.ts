import { Module } from '@nestjs/common';
import { SellingController } from '../controller/selling.controller';
import { SellingUseCaseService } from '../../application/services/selling.use-case.service';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { SellingRepositoryPrismaImplementation } from '../repositories/prisma/repository/prisma.selling.repository';
import { ProductUseCaseService } from 'src/modules/products/application/services/product.use-case.service';
import { ProductRepositoryPrismaImplementation } from 'src/modules/products/infrastructure/repositories/prisma/repository/prisma.product.repository';

@Module({
  imports: [],
  controllers: [SellingController],
  providers: [
    SellingUseCaseService,
    PrismaService,
    ProductUseCaseService,
    {
      provide: 'SellingRepository',
      useClass: SellingRepositoryPrismaImplementation,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryPrismaImplementation,
    },
  ],
})
export class SellingModuleUsingPrisma {}
