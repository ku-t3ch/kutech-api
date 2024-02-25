import { SelectColumnEnum } from "../enums/SelectColumn";
import * as _ from "lodash";

const getListBudget = (values: string[][], selectColumn: SelectColumnEnum) => {
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

export default getListBudget;
