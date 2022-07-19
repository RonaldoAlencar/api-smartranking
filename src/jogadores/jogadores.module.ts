import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { JogadoresProviders } from './jogadores.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [JogadoresController],
  providers: [JogadoresService, ...JogadoresProviders],
})
export class JogadoresModule {}
