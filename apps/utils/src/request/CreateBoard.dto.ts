import { IsString, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @MaxLength(200)
  name: string;
}
