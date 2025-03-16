import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/app.module';
import { UserModuleUsingPrisma } from './modules/users/infrastructure/module/user.module';
import { AuthModuleUsingPrisma } from './modules/authentication/infrastructure/module/auth.module';
import { ProductModuleUsingPrisma } from './modules/products/infrastructure/module/product.module';
import { SellingModuleUsingPrisma } from './modules/sales/infrastructure/module/selling.module';
import { ReturnModuleUsingPrisma } from './modules/returns/infrastructure/module/return.module';

@Module({
  imports: [
    HomeModule,
    UserModuleUsingPrisma,
    AuthModuleUsingPrisma,
    ProductModuleUsingPrisma,
    SellingModuleUsingPrisma,
    ReturnModuleUsingPrisma
  ],
  providers: [],
})
export class AppModule {}
