import { Inject, Injectable } from "@nestjs/common";
import { google, sheets_v4 } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import * as _ from "lodash";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import replaceAll from "src/utils/replaceAll";
import cachingSheet from "src/utils/CachingSheet";
import { SelectColumnEnum } from "./enums/SelectColumn";
import getListBudget from "./utils/GetListBudget";
import * as moment from "moment";

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
    const result: any = await cachingSheet(
      "Main Page!A:J",
      "budget",
      this.sheets_service,
      this.cacheManager
    );

    return {
      remaining_budget: parseFloat(result[0]?.[5].replace(",", "") ?? 0),
      budget_all: parseFloat(result[1]?.[3].replace(",", "") ?? 0),
      expenses_all: parseFloat(result[1]?.[7].replace(",", "") ?? 0),
      budget_from_income: parseFloat(result[3]?.[1].replace(",", "") ?? 0),
      budget_from_subsidize: parseFloat(result[3]?.[3].replace(",", "") ?? 0),
      expenses_from_income: parseFloat(result[3]?.[5].replace(",", "") ?? 0),
      expanses_from_subsidize: parseFloat(result[3]?.[7].replace(",", "") ?? 0),
      refund: parseFloat(result[1]?.[9].replace(",", "") ?? 0),
      budget_list_from_income: getListBudget(
        result,
        SelectColumnEnum.budget_list_from_income
      ),
      budget_list_form_subsidize: getListBudget(
        result,
        SelectColumnEnum.budget_list_form_subsidize
      ),
      expenses_list_from_income: getListBudget(
        result,
        SelectColumnEnum.expenses_list_from_income
      ),
      expenses_list_from_subsidize: getListBudget(
        result,
        SelectColumnEnum.expenses_list_form_subsidize
      ),
      refund_list: getListBudget(
        result,
        SelectColumnEnum.refund_list_from_income
      ),
    };
  }

  async getBudgetDetail() {
    const result_raw: any = await cachingSheet(
      "Detail!A:F",
      "budget_detail",
      this.sheets_service,
      this.cacheManager
    );

    const headers = result_raw[0];
    const result = _.map(result_raw.slice(1), (row) => {
      const obj = {};
      headers.forEach((header: string, index) => {
        obj[replaceAll(header, " ", "_").toLowerCase()] = [
          "Price per pcs.",
          "Pcs.",
          "Total",
        ].includes(header)
          ? parseFloat(row[index].replace(",", "") ?? 0)
          : row[index];
      });
      return obj;
    });

    return result;
  }

  async getProjects() {
    const result_raw: any = await cachingSheet(
      "Projects!A:K",
      "budget_projects",
      this.sheets_service,
      this.cacheManager
    );

    const headers = result_raw
      .shift()
      .map((header) => replaceAll(header, " ", "_").toLowerCase());
    const result = result_raw.slice(2).map((row) => {
      const obj: any = _.zipObject(headers, row);
      obj.income = parseFloat(replaceAll(String(obj.income), ",", "") ?? "0");
      obj.spent = parseFloat(replaceAll(String(obj.spent), ",", "") ?? "0");
      obj.remaining = parseFloat(
        replaceAll(String(obj.remaining), ",", "") ?? "0"
      );
      return obj;
    });
    return result;
  }

  async getActivities() {
    const result_raw: any = await cachingSheet(
      "Activities!A:H",
      "budget_activities",
      this.sheets_service,
      this.cacheManager
    );

    const headers = result_raw
      .shift()
      .map((header) => replaceAll(header, " ", "_").toLowerCase());
    const result = result_raw.map((row) => {
      const obj: any = _.zipObject(headers, row);
      obj.income = parseFloat(replaceAll(String(obj.income), ",", "") ?? "0");
      obj.spent = parseFloat(replaceAll(String(obj.spent), ",", "") ?? "0");
      obj.remaining = parseFloat(
        replaceAll(String(obj.remaining), ",", "") ?? "0"
      );
      return obj;
    });
    return result;
  }

  async getIncome() {
    const result_raw: any = await cachingSheet(
      "Income!A:G",
      "budget_income",
      this.sheets_service,
      this.cacheManager
    );
    const headers = result_raw
      .shift()
      .map((header) => replaceAll(header, " ", "_").toLowerCase());
    const result2 = [];
    result_raw.map((row) => {
      if (row.length <= 0 || row[0].length <= 0) {
        return;
      }
      const obj: any = _.zipObject(headers, row);
      obj.income = parseFloat(replaceAll(String(obj.income), ",", "") ?? "0");
      result2.push(obj);
    });
    return result2;
  }
}
