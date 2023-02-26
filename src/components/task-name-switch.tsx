import { Switch, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

type TaskNameSwitchProperties = {
  isCheckedTaskName: boolean;
  setIsCheckedTaskName: Dispatch<SetStateAction<boolean>>;
};

const TaskNameSwitch = ({
  isCheckedTaskName,
  setIsCheckedTaskName,
}: TaskNameSwitchProperties) => {
  const {
    fn: { primaryShade },
    colors: { teal, red },
  } = useMantineTheme();
  const shade = primaryShade();
  return (
    <Switch
      checked={isCheckedTaskName}
      onChange={({ currentTarget: { checked } }) =>
        setIsCheckedTaskName(checked)
      }
      color="teal"
      size="md"
      label="Embed task name"
      thumbIcon={
        isCheckedTaskName ? (
          <IconCheck size={12} color={teal[shade]} stroke={3} />
        ) : (
          <IconX size={12} color={red[shade]} stroke={3} />
        )
      }
    />
  );
};

export default TaskNameSwitch;
