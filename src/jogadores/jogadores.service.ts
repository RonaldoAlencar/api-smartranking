import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Resposta } from './dtos/resposta.dto';
import { Jogadores } from './entity/jogadores.entity';

@Injectable()
export class JogadoresService {
  constructor(
    @Inject('JOGADORES_REPOSITORY')
    private readonly jogadoresRepository: Repository<Jogadores>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Resposta> {
    const isjogadorAlreadyCreated = await this.jogadoresRepository.findOneBy({
      email: criarJogadorDto.email,
    });

    if (isjogadorAlreadyCreated) {
      throw new BadRequestException({
        statusCode: 400,
        message: `Jogador com o email ${criarJogadorDto.email} já existe`,
        data: {},
      });
    }

    const isJogadorCreated = await this.criar(criarJogadorDto);

    if (isJogadorCreated) {
      return {
        statusCode: 200,
        message: `Jogador criado com sucesso`,
        data: isJogadorCreated,
      };
    }

    throw new BadRequestException({
      statusCode: 400,
      message: `Erro ao criar jogador`,
      data: {},
    });
  }

  async atualizarJogador(
    id: number,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<Resposta> {
    const jogador = await this.jogadoresRepository.findOneBy({ id });

    if (!jogador) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Jogador com o id ${id} nÃÂ£o encontrado`,
        data: {},
      });
    }

    const { nome, telefoneCelular } = atualizarJogadorDto;
    const jogadorUpdated = await this.jogadoresRepository.update(id, {
      nome,
      telefoneCelular,
    });

    if (jogadorUpdated.affected === 0)
      throw new BadRequestException({
        statusCode: 400,
        message: `Erro ao atualizar jogador`,
        data: {},
      });

    return {
      statusCode: 200,
      message: 'Jogador atualizado com sucesso',
      data: await this.jogadoresRepository.findOneBy({ id }),
    };
  }

  async listarJogadores(): Promise<Resposta> {
    const allJogadores = await this.jogadoresRepository.find();

    if (allJogadores.length <= 0)
      throw new BadRequestException({
        statusCode: 400,
        message: `Não existem jogadores cadastrados`,
        data: {},
      });

    return {
      statusCode: 200,
      message: `Lista de jogadores`,
      data: allJogadores,
    };
  }

  async apagarJogador(id: number): Promise<Resposta> {
    const jogador = await this.jogadoresRepository.findOneBy({ id });
    if (!jogador) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Jogador com o id ${id} nÃÂÃÂ£o encontrado`,
        data: {},
      });
    }

    const isJogadorDeleted = await this.jogadoresRepository.delete(id);
    if (isJogadorDeleted.affected === 0)
      throw new BadRequestException({
        statusCode: 400,
        message: `NÃÂÃÂ£o foi possÃÂÃÂ­vel apagar o jogador com o id ${id}`,
        data: {},
      });

    return {
      statusCode: 200,
      message: 'Jogador apagado com sucesso',
      data: jogador,
    };
  }

  private async criar(criarJogadorDto: CriarJogadorDto) {
    const { nome, telefoneCelular, email } = criarJogadorDto;
    const jogadorCreated = await this.jogadoresRepository.save({
      nome,
      telefoneCelular,
      email,
    });
    return jogadorCreated;
  }

  async consultarJogadorPeloEmail(email: string): Promise<Resposta> {
    const jogadorEncontrado = await this.jogadoresRepository.findOneBy({
      email,
    });

    if (!jogadorEncontrado) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Jogador com o email ${email} não encontrado`,
        data: {},
      });
    }

    return {
      statusCode: 200,
      message: `Jogador encontrado`,
      data: jogadorEncontrado,
    };
  }

  async consultarJogadorPeloId(id: number): Promise<Resposta> {
    const jogador = await this.jogadoresRepository.findOneBy({ id });

    if (!jogador) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Jogador com o id ${id} nÃÂ£o encontrado`,
        data: {},
      });
    }

    return {
      statusCode: 200,
      message: `Jogador com o id ${id} encontrado`,
      data: jogador,
    };
  }
}
