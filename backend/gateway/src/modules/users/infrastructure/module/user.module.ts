import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
  controllers: [UserController],
  providers: [],
})
export class UserModuleUsingPrisma {}
