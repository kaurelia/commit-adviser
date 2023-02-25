import { Server } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type CommitShortenerResponse =
  | {
      commitAdvice: string;
    }
  | undefined;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const commitShortenerHandler = async (
  request: NextApiRequest,
  response: NextApiResponse<CommitShortenerResponse>
) => {
  if (request.method === "POST") {
    const trimmedCommitMessage: string = request.body.commitMessage.trim();
    if (!trimmedCommitMessage.length) {
      response.status(400).send(undefined);
      return;
    }
    const promptMessage = `Commit content start after colon sign. Improve that commit message to be clear, and have all commit rules satisfies: ${trimmedCommitMessage}`;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promptMessage,
    });
    response.status(200).json({
      commitAdvice:
        completion.data.choices[0].text || "I don't have any idea 🧐",
    });
    return;
  }
  response.status(405).send(undefined);
};

export default commitShortenerHandler;
