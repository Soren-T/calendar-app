import Head from "next/head";
import { Container } from "semantic-ui-react";

import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Head>
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <title>My Calendar App</title>
      </Head>
      <Header />
      <Container text style={{ padding: "2em" }}>
        {children}
      </Container>
    </>
  );
}

export default Layout;
