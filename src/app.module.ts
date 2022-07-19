import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JogadoresModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
