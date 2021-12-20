import type { NextPage } from "next";
import Head from "next/head";
import { AuthenticationFormCard } from "src/components/Card/AuthenticationFormCard";
import { AuthenticationFormLayout } from "src/components/Layout/AuthenticationFormLayout";
import { AppLayout } from "src/layouts/AppLayout";

const inputs = [
  { type: "email", name: "email", placeholder: "メールアドレス" },
  { type: "password", name: "password", placeholder: "パスワード" },
];

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="ログインページ" />
      </Head>
      <AppLayout>
        <AuthenticationFormLayout>
          <AuthenticationFormCard inputs={inputs} title="ログイン" />
        </AuthenticationFormLayout>
      </AppLayout>
    </>
  );
};

export default SignIn;
