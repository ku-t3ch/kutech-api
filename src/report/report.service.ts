import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ReportWebsiteRequestDto } from "./dto/reportwebsite.request.dto";

@Injectable()
export class ReportService {
  async send(body: ReportWebsiteRequestDto) {
    try {
      const data = {
        content: null,
        embeds: [
          {
            description: body.message,
            color: 5814783,
            timestamp: new Date().toJSON(),
          },
        ],
        attachments: [],
      };

      await axios({
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.DISCORD_WEBHOOK_URL,
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
    return "OK";
  }
}
