import { Tenses } from "@/pages/api/commit-adviser";
import { Radio } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

type TenseSelectProperties = {
  tense: Tenses;
  setTense: Dispatch<SetStateAction<Tenses>>;
};

const TenseSelect = ({ tense, setTense }: TenseSelectProperties) => {
  return (
    <Radio.Group
      name="chosenTense"
      label="Choose tense of commit"
      value={tense}
      onChange={(tense) => {
        setTense(tense as Tenses);
      }}
    >
      <Radio value={Tenses.PastSimple} label="Past Simple" />
      <Radio value={Tenses.PresentSimple} label="Present Simple" />
    </Radio.Group>
  );
};

export default TenseSelect;
