import { IsString, MaxLength } from "class-validator";

export class UpdateBoardDto {
  @IsString()
  @MaxLength(200)
  name: string;
}
