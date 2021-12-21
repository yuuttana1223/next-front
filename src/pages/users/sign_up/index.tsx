import type { NextPage } from "next";
import Head from "next/head";
import { AuthenticationForm } from "src/components/Authentication/Form/AuthenticationForm";
import { Maybe } from "src/components/Authentication/Message/Maybe";
import { AuthenticationLayout } from "src/components/Layout/AuthenticationLayout";
import { GuestLayout } from "src/layouts/GuestLayout";
import { PATH } from "src/urls/path";

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

const link = {
  href: PATH.USERS.SIGN_IN,
  value: "ログイン",
};

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="ユーザ登録ページ" />
      </Head>
      <GuestLayout>
        <AuthenticationLayout>
          <AuthenticationForm
            inputs={inputs}
            title="ユーザー登録"
            buttonText="登録"
          />
          <Maybe link={link} message="登録済みの方はこちら " />
        </AuthenticationLayout>
      </GuestLayout>
    </>
  );
};

export default SignUp;
