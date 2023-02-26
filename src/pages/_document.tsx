import { css, Global } from "@emotion/react";
import { createGetInitialProps } from "@mantine/next";
import { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Global
          styles={css`
            #__next {
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

Document.getInitialProps = getInitialProps;

export default Document;
