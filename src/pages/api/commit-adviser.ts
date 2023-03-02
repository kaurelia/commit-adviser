import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export type CommitShortenerResponse =
  | {
      commitAdvice: string;
    }
  | undefined;

export enum Tenses {
  PastSimple = "past simple",
  PresentSimple = "present simple",
}
type CommitShortenerPayload = Omit<NextApiRequest, "body"> & {
  body: {
    commitMessage: string;
    taskName?: string;
    isTaskNamePrefixed?: boolean;
    tense: Tenses;
  };
};
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const commitShortenerHandler = async (
  request: CommitShortenerPayload,
  response: NextApiResponse<CommitShortenerResponse>,
) => {
  if (request.method === "POST") {
    const trimmedCommitMessage = request.body.commitMessage.trim();
    const trimmedTaskName = request.body?.taskName?.trim();
    const { isTaskNamePrefixed, tense = Tenses.PastSimple } = request.body;
    if (!trimmedCommitMessage.length) {
      response.status(400).send(undefined);
      return;
    }

    const promptMessage = `Commit content start after colon sign. Improve that commit message to be clear, written in ${tense}, and have all commit rules satisfies: "${trimmedCommitMessage}"`;
    let completion: Awaited<
      ReturnType<typeof openai.createChatCompletion>
    > | null = null;
    try {
      completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptMessage }],
      });
    } catch {
      response.status(500).send(undefined);
      return;
    }

    const formattedAnswer = () => {
      if (trimmedTaskName) {
        if (isTaskNamePrefixed) {
          return `${completion?.data.choices[0].message?.content} ${trimmedTaskName}`;
        }
        return `${trimmedTaskName} ${completion?.data.choices[0].message?.content}`;
      }
      return completion?.data.choices[0].message?.content;
    };

    response.status(200).json({
      commitAdvice: formattedAnswer() || "I don't have any idea 🧐",
    });
    return;
  }
  response.status(405).send(undefined);
};

export default commitShortenerHandler;
