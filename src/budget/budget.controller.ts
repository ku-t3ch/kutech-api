import { Controller, Get } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Budget API")
@Controller('budget')

export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}
  @Get()
  getAll() {
    return this.budgetService.getBudget();
  }
}
