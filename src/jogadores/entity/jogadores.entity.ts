import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Jogadores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 20 })
  telefoneCelular: string;

  @Column()
  email: string;

  @Column({ default: 99})
  posicaoRanking: number;

  @Column({ default: null })
  urlFotoJogador: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}