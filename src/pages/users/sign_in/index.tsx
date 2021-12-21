import type { NextPage } from "next";
import Head from "next/head";
import { AuthenticationLayout } from "src/components/Layout/AuthenticationLayout";
import { AuthenticationForm } from "src/components/Authentication/Form/AuthenticationForm";
import { GuestLayout } from "src/layouts/GuestLayout";
import { Maybe } from "src/components/Authentication/Message/Maybe";
import { PATH } from "src/urls/path";

const inputs = [
  { type: "email", name: "email", placeholder: "メールアドレス" },
  { type: "password", name: "password", placeholder: "パスワード" },
];

const link = {
  href: PATH.USERS.SIGN_UP,
  value: "ユーザー登録",
};

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="ログインページ" />
      </Head>
      <GuestLayout>
        <AuthenticationLayout>
          <AuthenticationForm
            inputs={inputs}
            title="ログイン"
            buttonText="送信"
          />
          <Maybe link={link} message="初めての方はこちら " />
        </AuthenticationLayout>
      </GuestLayout>
    </>
  );
};

export default SignIn;
