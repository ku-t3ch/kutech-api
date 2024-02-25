import { ApiProperty } from "@nestjs/swagger";

// {
//     "activity_id": "A66-02",
//     "project_id": "166040010020",
//     "activity_name": "กิจกรรม Tech Camp #1 x สานสายใยวิทย์-คอม",
//     "start_date": "17/06/66",
//     "end_date": "17/06/66",
//     "income": 9000,
//     "spent": 8960,
//     "remaining": 40
//   },

export class BudgetActivitiesResponseDto {
  @ApiProperty({
    example: "A66-02",
  })
  activity_id: string;

  @ApiProperty({
    example: "166040010020",
  })
  project_id: string;

  @ApiProperty({
    example: "กิจกรรม Tech Camp #1 x สานสายใยวิทย์-คอม",
  })
  activity_name: string;

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
