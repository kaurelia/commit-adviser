import styled from "@emotion/styled";
import { Text as TextBase, TextProps } from "@mantine/core";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export const CommitAdviceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Text = styled(
  TextBase as FC<
    TextProps &
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >,
)`
  cursor: pointer;
`;
