import type { NextPage } from "next";
import Head from "next/head";
import { FloatingLabelInput } from "src/components/Input/FloatingLabelInput";
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
        <div className="flex flex-col min-h-screen bg-gray-100">
          <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
            <div className="w-full px-6 py-8 space-y-4 text-black bg-white rounded shadow-md">
              <h1 className="mb-8 text-3xl text-center">ユーザー登録</h1>
              {inputs.map((input) => (
                <FloatingLabelInput
                  key={input.name}
                  type={input.type}
                  name={input.name}
                >
                  {input.placeholder}
                </FloatingLabelInput>
              ))}
              <button
                type="submit"
                className="w-full py-3 text-center text-white rounded bg-emerald-400 hover:bg-emerald-500 focus:outline-none"
              >
                作成
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default SignUp;
