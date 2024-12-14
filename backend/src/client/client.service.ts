import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const existClientDocument = await this.prisma.client.findUnique({
      where: {
        document: createClientDto.document,
      },
    })

    if (existClientDocument) {
      throw new HttpException('Document already exist', HttpStatus.CONFLICT)
    }

    const existClientEmail = await this.prisma.client.findUnique({
      where: {
        email: createClientDto.email,
      },
    })

    if (existClientEmail) {
      throw new HttpException('Email already exist', HttpStatus.CONFLICT)
    }

    return await this.prisma.client.create({ data: createClientDto })
  }
}
