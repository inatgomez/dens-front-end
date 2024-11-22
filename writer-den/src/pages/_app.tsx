import { ModalProvider } from "@/context/modal-context";
import "../styles/globals.css";
import "@/components/minimal-tiptap/styles/index.css";
import { inter } from "@/assets/fonts/fonts";
import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </ModalProvider>
  );
}
