import Card from "@/components/card.styles";
import CommitAdvice from "@/components/commit-advice";
import CommitMessageTextarea from "@/components/commit-message-textarea";
import Container from "@/components/container.styles";
import TaskNameDetails from "@/components/task-name-details";
import TaskNameSwitch from "@/components/task-name-switch";
import TenseSelect from "@/components/tense-select";
import useCommitAdviser from "@/hooks/use-commit-adviser";
import { Button } from "@mantine/core";
import { useState } from "react";
import { Tenses } from "./api/commit-adviser";

const Home = () => {
  const [commitMessage, setCommitMessage] = useState("");
  const [taskName, setTaskName] = useState("");
  const [isPrefix, setIsPrefix] = useState(false);
  const [isCheckedTaskName, setIsCheckedTaskName] = useState(false);
  const [tense, setTense] = useState(Tenses.PastSimple);
  const {
    data: { commitAdvice },
    mutateAsync,
    error,
  } = useCommitAdviser({
    taskName,
    isPrefix,
    isCheckedTaskName,
    tense,
    commitMessage,
  });

  return (
    <Container>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <CommitMessageTextarea
          error={error as string}
          commitMessage={commitMessage}
          setCommitMessage={setCommitMessage}
        />
        <TenseSelect tense={tense} setTense={setTense} />
        <TaskNameSwitch
          isCheckedTaskName={isCheckedTaskName}
          setIsCheckedTaskName={setIsCheckedTaskName}
        />
        {isCheckedTaskName && (
          <TaskNameDetails
            taskName={taskName}
            setTaskName={setTaskName}
            isPrefix={isPrefix}
            setIsPrefix={setIsPrefix}
          />
        )}
        <Button
          disabled={!commitMessage.trim().length}
          onClick={() => {
            mutateAsync();
          }}
        >
          Ask for commit message
        </Button>
        {commitAdvice && <CommitAdvice commitAdvice={commitAdvice} />}
      </Card>
    </Container>
  );
};
export default Home;
