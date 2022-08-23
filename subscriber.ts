import { createClient } from "redis";
import async from "async";

import channels from "./channels";

class Subscriber {
  client: any;
  constructor() {
    this.client = createClient();
    this.client.on("error", (err: any) => console.log("Redis Client Error", err));
    this.client.connect();
  }
  subscribe = async () => {
    await async.eachSeries(channels, async (channel) => {
      console.log(channels, "?????");

      await this.client.subscribe(
        channels,
        (message: string, channel: string) => {
          const c = channel.toString();
          switch (c) {
            case "sms":
              console.log("sendign sms");
              console.log(message.toString(), channel.toString());
              break;
            case "email":
              console.log("sending email");
              console.log(message.toString(), channel.toString());
              break;
            case "slack":
              console.log("sending slack");
              console.log(message.toString(), channel.toString());
              break;
            default:
              console.log(message.toString(), channel.toString());
          }
        },
        true
      );
    });

    // await this.client.subscribe('sms', (message: string) => {
    //   console.log("sms")
    //   console.log(message.toString(), "<><><><>");
    // }, true);

    // await this.client.subscribe('slack', (message: string) => {
    //   console.log("slack")
    //   console.log(message.toString(), "<><><><>");
    // }, true);

  };
}

export default new Subscriber();
