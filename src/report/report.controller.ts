import { Body, Controller, Post } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Report API")
@Controller("report")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Post("/website")
  send(@Body() body: { message: string }) {
    return this.reportService.send(body.message);
  }
}
