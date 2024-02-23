import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ReportService {
  async send(message: string) {
    try {
      const data = {
        content: null,
        embeds: [
          {
            description: message,
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
