// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { configuration } from "../../utils/constant";
import { OpenAIApi } from "openai";

type Data = {
  result: string;
};

const openai = new OpenAIApi(configuration);


// {
//   "model": "text-davinci-003",
//   "prompt": "Say this is a test",
//   "max_tokens": 7,
//   "temperature": 0,
//   "top_p": 1,
//   "n": 1,
//   "stream": false,
//   "logprobs": null,
//   "stop": "\n"
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;
  console.log("input", input);

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `You are a marketing expert, and a customer approaches you to write a very short and exciting marketing copy for them. This is the topic they would like a marketing copy for: "${input}." This is the short marketing copy you came up with:`,
    temperature: 0.85,
    max_tokens: 50,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const suggestion = response.data?.choices?.[0].text;

  if (suggestion === undefined) throw new Error("No suggestion found");

  res.status(200).json({ result: suggestion });
}
