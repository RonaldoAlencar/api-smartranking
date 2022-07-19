import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Logger,
  Query,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidatorParamPipe } from './pipes/jogadores-validator-param.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Resposta } from './dtos/resposta.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Resposta> {
    return this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async AtualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('id', JogadoresValidatorParamPipe) id: number,
  ): Promise<Resposta> {
    return this.jogadoresService.atualizarJogador(id, atualizarJogadorDto);
  }

  @Get()
  async listarJogadores(): Promise<Resposta> {
    return this.jogadoresService.listarJogadores();
  }

  @Get('/busca')
  async listarJogadoresPorNome(
    @Query('email', JogadoresValidatorParamPipe) email: string,
  ): Promise<Resposta> {
    return this.jogadoresService.consultarJogadorPeloEmail(email);
  }

  @Get('/:id')
  async listarJogadoresPorId(
    @Param('id', JogadoresValidatorParamPipe) id: number,
  ): Promise<Resposta> {
    return this.jogadoresService.consultarJogadorPeloId(id);
  }

  @Delete('/:id')
  async apagarJogador(
    @Param('id', JogadoresValidatorParamPipe) id: number,
  ): Promise<Resposta> {
    return this.jogadoresService.apagarJogador(id);
  }
}
