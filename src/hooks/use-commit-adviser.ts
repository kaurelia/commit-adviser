import { CommitShortenerResponse, Tenses } from "@/pages/api/commit-adviser";
import { useMutation } from "react-query";

type UseCommitAdviserArguments = {
  commitMessage: string;
  isCheckedTaskName: boolean;
  taskName: string;
  isPrefix: boolean;
  tense: Tenses;
};

const useCommitAdviser = ({
  commitMessage,
  isCheckedTaskName,
  taskName,
  isPrefix,
  tense,
}: UseCommitAdviserArguments) => {
  const { data, error, mutateAsync } = useMutation<CommitShortenerResponse>(
    async () => {
      const response = await fetch("/api/commit-adviser", {
        method: "POST",
        body: JSON.stringify({
          commitMessage,
          taskName: isCheckedTaskName ? taskName : undefined,
          isTaskNamePrefixed: isCheckedTaskName ? isPrefix : undefined,
          tense,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      return response.json();
    },
    { mutationKey: ["commit-adviser", commitMessage] },
  );

  const fixedData: NonNullable<Partial<CommitShortenerResponse>> = Object(data);

  return { error, mutateAsync, data: fixedData };
};

export default useCommitAdviser;
