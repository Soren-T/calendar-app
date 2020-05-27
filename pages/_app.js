import App from "next/app";
import Layout from '../components/_App/Layout'

// import node_modules css 
import "rc-time-picker/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
// import "react-big-calendar/lib/sass/styles";

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