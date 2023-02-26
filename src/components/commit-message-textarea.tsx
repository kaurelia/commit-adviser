import { Textarea } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

type CommitMessageTextareaProperties = {
  error: string;
  commitMessage: string;
  setCommitMessage: Dispatch<SetStateAction<string>>;
};

const CommitMessageTextarea = ({
  error,
  commitMessage,
  setCommitMessage,
}: CommitMessageTextareaProperties) => {
  return (
    <Textarea
      maxLength={2048}
      minRows={2}
      maxRows={2}
      withAsterisk
      label="Commit message"
      placeholder="Added new feature..."
      error={error}
      value={commitMessage}
      onChange={({ currentTarget: { value } }) => setCommitMessage(value)}
    />
  );
};

export default CommitMessageTextarea;
