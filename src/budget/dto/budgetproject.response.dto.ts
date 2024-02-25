import { ApiProperty } from "@nestjs/swagger";

export class BudgetProjectResponseDto {
  @ApiProperty({
    example: "2566",
  })
  year: string;

  @ApiProperty({
    example: "งบอุดหนุน",
  })
  category: string;

  @ApiProperty({
    example: "166040010020",
  })
  project_id: string;

  @ApiProperty({
    example: "เทคแคมป์ ครั้งที่ 1",
  })
  project_name: string;

  @ApiProperty({
    example: "17/06/66",
  })
  start_date: string;

  @ApiProperty({
    example: "17/06/66",
  })
  end_date: string;

  @ApiProperty({
    example: 9000,
  })
  income: number;

  @ApiProperty({
    example: 8960,
  })
  spent: number;

  @ApiProperty({
    example: 40,
  })
  remaining: number;
}
