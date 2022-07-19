import { DataSource } from 'typeorm';
import { Jogadores } from './entity/jogadores.entity';

export const JogadoresProviders = [
  {
    provide: 'JOGADORES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Jogadores),
    inject: ['DATA_SOURCE'],
  },
];