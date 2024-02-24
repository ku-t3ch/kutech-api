import { sheets_v4 } from "googleapis";
import { Cache } from "@nestjs/cache-manager";

const cachingSheet = async (
  range: string,
  cacheKey: string,
  sheets_service: sheets_v4.Sheets,
  cacheManager: Cache
) => {
  const key1 = `${cacheKey}_1`;
  const key2 = `${cacheKey}_2`;

  const ttl1 = 1000 * 60 * 60 * 3;
  const ttl2 = 1000 * 60 * 60 * 24 * 30;

  const result_raw1: string = await cacheManager.get(key1);
  const result_raw2: string = await cacheManager.get(key2);
  let result;
  if (result_raw1 && result_raw2) {
    result = JSON.parse(result_raw1);
    console.log(`${range} : cache hit`);
  } else if (!result_raw1 && result_raw2) {
    result = JSON.parse(result_raw2);
    console.log(`${range} : cache hit and query`);
    sheets_service.spreadsheets.values
      .get({
        spreadsheetId: process.env.BUDGET_SPREADS_SHEET_ID,
        range: range,
      })
      .then((res) => {
        cacheManager.set(key1, JSON.stringify(res), ttl1);
        cacheManager.set(key2, JSON.stringify(res), ttl2);
      });
  } else {
    // init
    result = await sheets_service.spreadsheets.values.get({
      spreadsheetId: process.env.BUDGET_SPREADS_SHEET_ID,
      range: range,
    });
    await cacheManager.set(key1, JSON.stringify(result), ttl1);
    await cacheManager.set(key2, JSON.stringify(result), ttl2);
    console.log(`${range} : cache miss`);
  }
  return result.data.values;
};

export default cachingSheet;
