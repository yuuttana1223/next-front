import type { NextPage } from "next";
import Head from "next/head";
import { SignUpForm } from "src/components/Authentication/Form/SignUpForm";
import { GuestLayout } from "src/layouts/GuestLayout";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="ユーザ登録ページ" />
      </Head>
      <GuestLayout>
        <SignUpForm />
      </GuestLayout>
    </>
  );
};

export default SignUp;
