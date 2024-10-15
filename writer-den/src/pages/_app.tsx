import { ModalProvider } from "@/context/modal-context";
import "../styles/globals.css";
import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}
