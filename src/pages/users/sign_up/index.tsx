import type { NextPage } from "next";
import Head from "next/head";
import { AuthenticationFormCard } from "src/components/Card/AuthenticationFormCard";
import { AuthenticationFormLayout } from "src/components/Layouts/AuthenticationFormLayout";
import { AppLayout } from "src/layouts/AppLayout";

const inputs = [
  { type: "name", name: "name", placeholder: "名前" },
  { type: "email", name: "email", placeholder: "メールアドレス" },
  { type: "password", name: "password", placeholder: "パスワード" },
  {
    type: "password",
    name: "password_confirmation",
    placeholder: "パスワード確認",
  },
];

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="ユーザ登録ページ" />
      </Head>
      <AppLayout>
        <AuthenticationFormLayout>
          <AuthenticationFormCard inputs={inputs} title="ユーザー登録" />
        </AuthenticationFormLayout>
      </AppLayout>
    </>
  );
};

export default SignUp;
