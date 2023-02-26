import styled from "@emotion/styled";
import { Card as CardBase, CardProps } from "@mantine/core";
import { FC } from "react";

const Card = styled(CardBase as FC<CardProps>)`
  > * {
    margin-top: 20px;
    margin-bottom: 20px;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default Card;
