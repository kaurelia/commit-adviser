import { useState } from "react";
import { CommitAdviceWrapper, Text } from "./commit-advice.styles";
import CopyButton from "./copy-button";

type CommitAdviceProperties = {
  commitAdvice: string;
};
const CommitAdvice = ({ commitAdvice }: CommitAdviceProperties) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <CommitAdviceWrapper>
      <Text
        size="sm"
        onClick={() => {
          setIsCopied(true);
          navigator.clipboard.writeText(commitAdvice);
        }}
        color="dimmed"
      >
        {commitAdvice}
      </Text>
      <CopyButton
        commitAdvice={commitAdvice}
        isCopied={isCopied}
        setIsCopied={setIsCopied}
      />
    </CommitAdviceWrapper>
  );
};

export default CommitAdvice;
