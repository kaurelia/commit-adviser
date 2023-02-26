import { Switch, TextInput, useMantineTheme } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

type TaskNameDetailsProperties = {
  taskName: string;
  setTaskName: Dispatch<SetStateAction<string>>;
  isPrefix: boolean;
  setIsPrefix: Dispatch<SetStateAction<boolean>>;
};

const TaskNameDetails = ({
  taskName,
  setTaskName,
  isPrefix,
  setIsPrefix,
}: TaskNameDetailsProperties) => {
  const theme = useMantineTheme();

  return (
    <>
      <TextInput
        value={taskName}
        placeholder="GPT-100"
        onChange={({ currentTarget: { value } }) => setTaskName(value)}
      />
      <Switch
        size="md"
        color={theme.colorScheme === "dark" ? "gray" : "dark"}
        onLabel={"Postfix"}
        offLabel={"Prefix"}
        checked={isPrefix}
        onChange={(event) => setIsPrefix(event.currentTarget.checked)}
      />
    </>
  );
};

export default TaskNameDetails;
