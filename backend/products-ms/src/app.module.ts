import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/app.module';
import { ProductModuleUsingPrisma } from './modules/products/infrastructure/module/product.module';

@Module({
  imports: [HomeModule, ProductModuleUsingPrisma],
  providers: [
  ],
})
export class AppModule {}
