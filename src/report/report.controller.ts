import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from "@nestjs/common";
import { ReportService } from "./report.service";
import { ApiTags } from "@nestjs/swagger";
import { ReportWebsiteDto } from "./dto/dto.budget";
import * as requestIp from "request-ip";
import * as FormData from "form-data";
import axios from "axios";

@ApiTags("Report API")
@Controller("report")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Post("/website")
  async send(@Body() body: ReportWebsiteDto, @Req() req) {
    try {
      const detectedIp = requestIp.getClientIp(req);
      const formData = new FormData();
      formData.append("secret", process.env.CT_SECRET);
      formData.append("response", body.token);
      formData.append("remoteip", detectedIp!);

      const { data } = await axios({
        method: "post",
        maxBodyLength: Infinity,
        url: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        headers: {
          ...formData.getHeaders(),
        },
        data: formData,
      });

      if (!data.success) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: "Token is not valid",
          },
          HttpStatus.FORBIDDEN
        );
      }

      return this.reportService.send(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: error.message,
          },
          HttpStatus.FORBIDDEN
        );
      }
    }
  }
}
