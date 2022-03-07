import "src/assets/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "src/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import axios from "axios";
import NextHeadSeo from "next-head-seo";
import Cookies from "js-cookie";
import Head from "next/head";

const fetcher = (url: string) => {
  return axios
    .get(url, {
      headers: {
        "access-token": Cookies.get("access_token") ?? "",
        client: Cookies.get("client") ?? "",
        uid: Cookies.get("uid") ?? "",
      },
    })
    .then((res) => res.data)
    .catch(() => {
      throw new Error("エラーが発生したため、データの取得に失敗しました。");
    });
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextHeadSeo
        title="kcg-review"
        canonical="https://kcg-review.vercel.app"
        description="京都コンピュータ学院の授業評価サイトです。気に入った授業を見つけて有意義な時間を手に入れましょう!"
        og={{
          image:
            "https://kcg-review.vercel.app/images/school_building_ekimae.png",
          type: "article",
          siteName: "kcg-review",
        }}
        twitter={{
          card: "summary",
        }}
      />
      <Head>
        <meta
          name="google-site-verification"
          content="JuEskajKJ3FMvHlts2yt0w2sIv9_ybpScaQ5gFuatXo"
        />
      </Head>
      <AuthProvider>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
        <Toaster toastOptions={{ duration: 5000 }} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
