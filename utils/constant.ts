import {Configuration} from "openai"

export const configuration = new Configuration({
  apiKey: process.env.OPEN_API,
});
