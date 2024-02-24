import { ApiProperty } from '@nestjs/swagger';

export class BudgetFromIncome {
  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;
}

export class BudgetFromSubsidize {
  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;
}

export class ExpensesFromIncome {
  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;
}

export class ExpensesFromSubsidize {
  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;
}

export class Refund {
  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;
}

export class BudgetResponseDto {
  @ApiProperty()
  remaining_budget: number;

  @ApiProperty()
  budget_all: number;

  @ApiProperty()
  expenses_all: number;

  @ApiProperty()
  budget_from_income: number;

  @ApiProperty()
  budget_from_subsidize: number;

  @ApiProperty()
  expenses_from_income: number;

  @ApiProperty()
  expenses_from_subsidize: number;

  @ApiProperty()
  refund: number;

  @ApiProperty({ type: [BudgetFromIncome] })
  budget_list_from_income: BudgetFromIncome[];

  @ApiProperty({ type: [BudgetFromSubsidize] })
  budget_list_form_subsidize: BudgetFromSubsidize[];

  @ApiProperty({ type: [ExpensesFromIncome] })
  expenses_list_from_income: ExpensesFromIncome[];

  @ApiProperty({ type: [ExpensesFromSubsidize] })
  expenses_list_from_subsidize: ExpensesFromSubsidize[];

  @ApiProperty({ type: [Refund] })
  refund_list: Refund[];
}
