import { Controller, Get } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { BudgetResponseDto } from "./dto/budget.response.dto";
import { BudgetDetailResponseDto } from "./dto/budgetdetail.response.dto";
import { BudgetProjectResponseDto } from "./dto/budgetproject.response.dto";
import { BudgetActivitiesResponseDto } from "./dto/budgetactivities.response.dto";
import { BudgetIcomeResponseDto } from "./dto/budgetincome.response.dto";

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

  @Get("/details")
  @ApiResponse({
    type: BudgetDetailResponseDto,
    isArray: true,
  })
  getDetails() {
    return this.budgetService.getBudgetDetail();
  }

  @Get("/projects")
  @ApiResponse({
    type: BudgetProjectResponseDto,
    isArray: true,
  })
  getProjects() {
    return this.budgetService.getProjects();
  }

  @Get("/activities")
  @ApiResponse({
    type: BudgetActivitiesResponseDto,
    isArray: true,
  })
  getActivities() {
    return this.budgetService.getActivities();
  }

  @Get("/incomes")
  @ApiResponse({
    type: BudgetIcomeResponseDto,
    isArray: true,
  })
  getIncome() {
    return this.budgetService.getIncome();
  }
}
