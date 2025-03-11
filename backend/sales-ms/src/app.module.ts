import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/app.module';
import { GlobalExceptionFilter } from './shared/errors/exception/GlobalExceptionHandler';
import { SellingModuleUsingPrisma } from './modules/sales/infrastructure/module/selling.module';

@Module({
  imports: [HomeModule, SellingModuleUsingPrisma],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
