import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserUseCaseService } from '../../application/services/user.use-case.service';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { UserRepositoryPrismaImplementation } from '../repositories/prisma/repository/prisma.user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserUseCaseService,
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrismaImplementation,
    },
  ],
})
export class UserModuleUsingPrisma {}
