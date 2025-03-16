import { Module } from '@nestjs/common';
import { SellingController } from '../controller/selling.controller';import { ClientsModule, Transport } from '@nestjs/microservices';
import { environments } from 'src/settings/environments/environments';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: environments.salesService,
        transport: Transport.TCP,
        options: {
          host: environments.salesMicroserviceHost,
          port: environments.salesMicroservicePort,
        }
      }
    ]),
  ],
  controllers: [SellingController],
  providers: [],
})
export class SellingModuleUsingPrisma {}
