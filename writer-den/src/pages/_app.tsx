import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import "@/components/minimal-tiptap/styles/index.css";
import { inter } from "@/assets/fonts/fonts";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
