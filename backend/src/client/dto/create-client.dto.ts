import { IsEmail, IsEnum, IsString } from 'class-validator'
import { ColorsEnum } from 'src/enum/color.enum'

export class CreateClientDto {
  @IsString()
  name: string

  @IsString()
  document: string

  @IsEmail()
  email: string

  @IsEnum(ColorsEnum)
  color: ColorsEnum

  @IsString()
  observation: string
}
