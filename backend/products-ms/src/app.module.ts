import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/app.module';
import { ProductModuleUsingPrisma } from './modules/products/infrastructure/module/product.module';
import { GlobalExceptionFilter } from './shared/errors/exception/GlobalExceptionHandler';

@Module({
  imports: [HomeModule, ProductModuleUsingPrisma],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
