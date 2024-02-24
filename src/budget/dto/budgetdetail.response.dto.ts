import { ApiProperty } from "@nestjs/swagger";

export class BudgetDetailResponseDto {
  @ApiProperty({
    example: "A66-02",
  })
  activity_id: string;

  @ApiProperty({
    example: "ค่าวัสดุ",
  })
  category: string;

  @ApiProperty({
    example: "Power Bank",
  })
  name: string;

  @ApiProperty({
    example: 220,
  })
  price_per_pcs: number;

  @ApiProperty({
    example: 7,
  })
  pcs: number;

  @ApiProperty({
    example: 1540,
  })
  total: number;
}
