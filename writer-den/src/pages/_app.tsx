import Provider from "@/redux/provider";
import "@/styles/globals.css";
import "@/components/minimal-tiptap/styles/index.css";
import { inter } from "@/assets/fonts/fonts";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
