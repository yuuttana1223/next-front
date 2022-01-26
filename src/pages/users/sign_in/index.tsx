import type { NextPage } from "next";
import Head from "next/head";
import { GuestLayout } from "src/layouts/GuestLayout";
import { SignInForm } from "src/components/Form/SignInForm";
import { GuestUserRoute } from "src/routes/GuestUserRouter";

const SignIn: NextPage = () => {
  return (
    <GuestUserRoute>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="ログインページ" />
      </Head>
      <GuestLayout>
        <SignInForm />
      </GuestLayout>
    </GuestUserRoute>
  );
};

export default SignIn;
