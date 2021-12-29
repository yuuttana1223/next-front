import type { NextPage } from "next";
import Head from "next/head";
import { GuestLayout } from "src/layouts/GuestLayout";
import { SignInForm } from "src/components/Authentication/Form/SignInForm";

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="ログインページ" />
      </Head>
      <GuestLayout>
        <SignInForm />
      </GuestLayout>
    </>
  );
};

export default SignIn;
