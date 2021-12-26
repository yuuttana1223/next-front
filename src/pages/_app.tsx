import "src/assets/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "src/providers/AuthProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
