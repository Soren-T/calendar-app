import App from "next/app";
import Layout from '../components/_App/Layout'

import 'rc-time-picker/assets/index.css';
import 'rc-datepicker/lib/style.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component { ...pageProps } />
      </Layout>
    );
  }
}

export default MyApp;