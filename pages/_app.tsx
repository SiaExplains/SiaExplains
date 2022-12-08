import "../src/styles/styles.scss";
import type { AppProps } from "next/app";
import quotes from "../common/quotes.json";

export default function App({ Component, pageProps }: AppProps) {
  const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
  const customPageProps = { ...pageProps, randomQuoteIndex };
  return <Component {...customPageProps} />;
}
