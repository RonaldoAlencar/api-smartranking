import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { Resposta } from "../dtos/resposta.dto";

export class JogadoresValidatorParamPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(!value) {
            throw new BadRequestException({
                message: `O valor do parâmetro ${metadata.data} não pode ser nulo`,
                data: {},
                statusCode: 400
            })
        }

        return value;
    }
}