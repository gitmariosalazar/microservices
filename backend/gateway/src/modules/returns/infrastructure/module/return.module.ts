import { Module } from '@nestjs/common';
import { ReturnController } from '../controller/return.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environments } from 'src/settings/environments/environments';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: environments.returnsService,
        transport: Transport.TCP,
        options: {
          host: environments.returnsMicroserviceHost,
          port: environments.returnsMicroservicePort,
        }
      }
    ]),
  ],
  controllers: [ReturnController],
  providers: [],
})
export class ReturnModuleUsingPrisma {}
