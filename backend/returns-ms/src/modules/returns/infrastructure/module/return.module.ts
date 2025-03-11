import { Module } from '@nestjs/common';
import { ReturnController } from '../controller/return.controller';
import { ReturnUseCaseService } from '../../application/services/return.use-case.service';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { ReturnRepositoryPrismaImplementation } from '../repositories/prisma/repository/prisma.return.repository';

@Module({
  imports: [],
  controllers: [ReturnController],
  providers: [
    ReturnUseCaseService,
    PrismaService,
    {
      provide: 'ReturnRepository',
      useClass: ReturnRepositoryPrismaImplementation,
    },
  ],
})
export class ReturnModuleUsingPrisma {}
