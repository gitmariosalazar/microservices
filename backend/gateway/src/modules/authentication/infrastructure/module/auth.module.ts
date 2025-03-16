import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from '../controller/auth.controller';
import { Module } from '@nestjs/common';
import { environments } from 'src/settings/environments/environments';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: environments.authService,
        transport: Transport.TCP,
        options: {
          host: environments.authMicroserviceHost,
          port: environments.authMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthModuleUsingPrisma {}
