import { Controller, Get } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { BudgetResponseDto } from "./dto/budget.response.dto";
import { BudgetDetailResponseDto } from "./dto/budgetdetail.response.dto";

@ApiTags("Budget API")
@Controller("budget")
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}
  @Get()
  @ApiResponse({
    type: BudgetResponseDto,
  })
  getAll() {
    return this.budgetService.getBudget();
  }

  @Get("/detail")
  @ApiResponse({
    type: BudgetDetailResponseDto,
    isArray: true,
  })
  getDetail() {
    return this.budgetService.getBudgetDetail();
  }
}
