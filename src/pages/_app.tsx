import "../styles/globals.css";

import type { AppProps } from "next/app";
import GoogleTagManager, {
  GoogleTagManagerId,
} from "src/components/GoogleTagManager";
import { Layout } from "src/components/Layout/Layout";
import { googleTagManagerId } from "src/types/gtm";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleTagManager
        googleTagManagerId={googleTagManagerId as GoogleTagManagerId}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
