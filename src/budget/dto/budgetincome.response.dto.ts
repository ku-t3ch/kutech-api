import { ApiProperty } from "@nestjs/swagger";

// {
//     "budget_type": "เงินรายได้",
//     "year": "2566",
//     "ref": "PJ66-01",
//     "category": "งบคณะกรรมการ",
//     "name": "เงินคณะกรรมการฯ (เบียร)",
//     "income": 100
//   },

export class BudgetIcomeResponseDto {
  @ApiProperty({
    example: "เงินรายได้",
  })
  budget_type: string;

  @ApiProperty({
    example: "2566",
  })
  year: string;

  @ApiProperty({
    example: "PJ66-01",
  })
  ref: string;

  @ApiProperty({
    example: "งบคณะกรรมการ",
  })
  category: string;

  @ApiProperty({
    example: "เงินคณะกรรมการฯ (เบียร)",
  })
  name: string;

  @ApiProperty({
    example: 100,
  })
  income: number;
}
