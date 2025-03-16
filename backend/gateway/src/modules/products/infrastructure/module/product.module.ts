import { Module } from '@nestjs/common';
import { ProductController } from '../controller/product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environments } from 'src/settings/environments/environments';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: environments.productsService,
        transport: Transport.TCP,
        options: {
          host: environments.productsMicroserviceHost,
          port: environments.productsMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [],
})
export class ProductModuleUsingPrisma {}
