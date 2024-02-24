import { ApiProperty } from "@nestjs/swagger";

export class ReportWebsiteRequestDto {
  @ApiProperty()
  message: string;
  @ApiProperty({
    description: "Token from Cloudflare turnstile",
  })
  token: string;
}
