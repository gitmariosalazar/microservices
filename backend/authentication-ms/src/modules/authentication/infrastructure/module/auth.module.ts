import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controller/auth.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { JwtUseCaseService } from '../../application/services/jwt.use-case.service';
import { AuthUseCaseService } from '../../application/services/auth.use-case.service';
import { UserRepositoryPrismaImplementation } from 'src/modules/users/infrastructure/repositories/prisma/repository/prisma.user.repository';
import { Module } from '@nestjs/common';
import { environments } from 'src/settings/environments/environments';

@Module({
  imports: [
    JwtModule.register({
      secret: environments.secretKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    JwtUseCaseService,
    AuthUseCaseService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrismaImplementation,
    },
    {
      provide: 'JwtService',
      useClass: JwtUseCaseService,
    },
  ],
  exports: [JwtModule, JwtUseCaseService],
})
export class AuthModuleUsingPrisma {}
