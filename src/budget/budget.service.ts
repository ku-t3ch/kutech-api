import { Inject, Injectable } from "@nestjs/common";
import { google, sheets_v4 } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import * as _ from "lodash";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

enum SelectColumn {
  budget_list_from_income = 0,
  budget_list_form_subsidize = 2,
  expenses_list_from_income = 4,
  expenses_list_form_subsidize = 6,
  refund_list_from_income = 8,
}

const getList = (values: string[][], selectColumn: SelectColumn) => {
  const groupedData = _.chain(values?.slice(6))
    .filter((row) => row[selectColumn] !== "" && !!row[selectColumn + 1]) // Remove empty rows
    .map((row) => ({
      name: row[selectColumn],
      amount: parseFloat(String(row[selectColumn + 1]).replace(",", "")) ?? 0,
    }))
    .groupBy("name")
    .map((values, name) => ({
      name,
      amount: _.sumBy(values, "amount"),
    }))
    .value();
  return groupedData;
};

@Injectable()
export class BudgetService {
  public sheets_service: sheets_v4.Sheets;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNTS);
    const auth = new GoogleAuth({
      credentials: {
        ...credentials,
        private_key: credentials.private_key.split(String.raw`\n`).join("\n"),
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    this.sheets_service = google.sheets({ version: "v4", auth: auth });
  }

  async getBudget() {
    const result_raw: string = await this.cacheManager.get("budgetData");
    let result;
    if (result_raw) {
      result = JSON.parse(result_raw);
      console.log("budget : cache hit");
    } else {
      result = await this.sheets_service.spreadsheets.values.get({
        spreadsheetId: process.env.BUDGET_SPREADS_SHEET_ID,
        range: "Main Page!A:J",
      });
      await this.cacheManager.set("budgetData", JSON.stringify(result), 1000 * 60 * 60 * 3);
      console.log("budget : cache miss");
    }

    return {
      remaining_budget: parseFloat(
        result.data.values?.[0]?.[5].replace(",", "") ?? 0
      ),
      budget_all: parseFloat(
        result.data.values?.[1]?.[3].replace(",", "") ?? 0
      ),
      expenses_all: parseFloat(
        result.data.values?.[1]?.[7].replace(",", "") ?? 0
      ),
      budget_from_income: parseFloat(
        result.data.values?.[3]?.[1].replace(",", "") ?? 0
      ),
      budget_from_subsidize: parseFloat(
        result.data.values?.[3]?.[3].replace(",", "") ?? 0
      ),
      expenses_from_income: parseFloat(
        result.data.values?.[3]?.[5].replace(",", "") ?? 0
      ),
      expanses_from_subsidize: parseFloat(
        result.data.values?.[3]?.[7].replace(",", "") ?? 0
      ),
      refund: parseFloat(result.data.values?.[1]?.[9].replace(",", "") ?? 0),
      budget_list_from_income: getList(
        result.data.values,
        SelectColumn.budget_list_from_income
      ),
      budget_list_form_subsidize: getList(
        result.data.values,
        SelectColumn.budget_list_form_subsidize
      ),
      expenses_list_from_income: getList(
        result.data.values,
        SelectColumn.expenses_list_from_income
      ),
      expenses_list_from_subsidize: getList(
        result.data.values,
        SelectColumn.expenses_list_form_subsidize
      ),
      refund_list: getList(
        result.data.values,
        SelectColumn.refund_list_from_income
      ),
    };
  }
}
