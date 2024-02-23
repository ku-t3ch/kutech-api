import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ReportWebsiteDto } from "./dto/dto.budget";

@Injectable()
export class ReportService {
  async send(body: ReportWebsiteDto) {
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
