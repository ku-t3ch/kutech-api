import { ApiProperty } from "@nestjs/swagger";

export class ReportWebsiteDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  token: string;
}
