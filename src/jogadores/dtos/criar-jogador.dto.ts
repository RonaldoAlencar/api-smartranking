import { Contains, IsEmail, IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty({ message: 'O nome do jogador é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo telefone celular é obrigatório' })
  @Matches(/^\d{11}$/, { message: 'O campo telefone celular deve conter apenas números. Ex: 00000000000' })
  telefoneCelular: string;

  @IsEmail({}, { message: 'O email informado não é um email válido' })
  @Contains('@gmail.com', {
    message: 'O email precisa ser do dominio gmail.com',
  })
  email: string;
}
