import "src/assets/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "src/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import axios from "axios";

const fetcher = (url: string) => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch(() => {
      throw new Error("エラーが発生したため、データの取得に失敗しました。");
    });
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthProvider>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
      <Toaster />
      </AuthProvider>
    </>
  );
};

export default MyApp;
