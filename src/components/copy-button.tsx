import {
  ActionIcon,
  CopyButton as CopyButtonBase,
  CopyButtonProps,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type CopyButtonProperties = {
  commitAdvice: string;
  isCopied: boolean;
  setIsCopied: Dispatch<SetStateAction<boolean>>;
};

type CopyButtonContentProperties = Parameters<CopyButtonProps["children"]>[0] &
  Pick<CopyButtonProperties, "isCopied">;

const CopyButtonContent = ({
  copied,
  copy,
  isCopied,
}: CopyButtonContentProperties) => {
  const isCopiedResult = isCopied || copied;
  return (
    <Tooltip
      label={isCopiedResult ? "Copied" : "Copy"}
      withArrow
      position="top"
    >
      <ActionIcon color={isCopiedResult ? "teal" : "gray"} onClick={copy}>
        {isCopiedResult ? <IconCheck size={16} /> : <IconCopy size={16} />}
      </ActionIcon>
    </Tooltip>
  );
};

const CopyButton = ({
  commitAdvice,
  isCopied,
  setIsCopied,
}: CopyButtonProperties) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isCopied) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        console.log("timeout");
        setIsCopied(false);
      }, 2000);
    }
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [isCopied]);

  return (
    <CopyButtonBase value={commitAdvice} timeout={2000}>
      {({ copy, copied }) => {
        return (
          <CopyButtonContent isCopied={isCopied} copied={copied} copy={copy} />
        );
      }}
    </CopyButtonBase>
  );
};

export default CopyButton;
