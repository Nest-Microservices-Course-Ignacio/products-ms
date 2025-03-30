import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number) // Transform string to number
  public price: number;
}
