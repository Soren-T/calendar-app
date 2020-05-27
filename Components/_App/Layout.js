import Head from "next/head";
import { Container } from "semantic-ui-react";

import Header from "./Header";
import HeadContent from "./HeadContent";

function Layout({ children }) {
  return (
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/styles.css" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        <link rel="stylesheet" type="text/css" href="/react-big-calendar.css" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" />
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
