import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto)
  }
}
