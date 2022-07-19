import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty({ message: 'O nome do jogador é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo telefone celular é obrigatório' })
  telefoneCelular: string;

  @IsEmail({}, { message: 'O email informado não é um email válido' })
  email: string;
}
