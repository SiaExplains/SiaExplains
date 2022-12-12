import "../src/styles/styles.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import quotes from "../common/quotes.json";
import Layout from "../src/components/Layout/Layout";
import { AppRoutes } from "../config/routes";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
  const customPageProps = { ...pageProps, randomQuoteIndex };

  return (
    <Layout isFullWidth={router.pathname === AppRoutes.home}>
      <Component {...customPageProps} />
    </Layout>
  );
}
