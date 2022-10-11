import "../styles/globals.css";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position="top-center"
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
