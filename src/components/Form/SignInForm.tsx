import { VFC, useContext } from "react";
import { Button } from "src/components/shared/Button";
import { FloatingLabelInput } from "src/components/shared/Input/FloatingLabelInput";
import { Maybe } from "src/components/Message/Maybe";
import { PATH } from "src/urls/path";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { reg } from "src/constants/email";
import { signIn } from "src/apis/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AuthContext } from "src/providers/AuthProvider";
import toast from "react-hot-toast";

export type Inputs = {
  email: string;
  password: string;
};

export const SignInForm: VFC = () => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const router = useRouter();
  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (params) => {
    signIn(params)
      .then((res) => {
        if (res.status === 200) {
          Cookies.set("access_token", res.headers["access-token"]);
          Cookies.set("client", res.headers["client"]);
          Cookies.set("uid", res.headers["uid"]);
          toast.success("ログインに成功しました", {
            duration: 10000,
          });
          setCurrentUser(res.data.data);
          console.log(res.data);

          console.log(currentUser);

          router.push(PATH.ROOT);
        } else {
          toast.error("ログインに失敗しました");
        }
      })
      .catch(() => {
        toast.error("ログインに失敗しました");
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 className="mb-8 text-3xl text-center">ログイン</h1>
        <div className="my-2">
          <FloatingLabelInput
            type="email"
            name="email"
            placeholder="メールアドレス"
            validation={{
              pattern: reg,
              required: true,
            }}
          />
          {methods.formState.errors.email && (
            <ErrorMessage message="有効なメールアドレスを入力してください" />
          )}
        </div>
        <div className="my-2">
          <FloatingLabelInput
            type="password"
            name="password"
            placeholder="パスワード"
            validation={{ required: true, minLength: 8, maxLength: 25 }}
          />
          <p className="my-2 text-xs text-gray-400">
            8桁以上25桁以下の英数字を入力してください
          </p>
          {methods.formState.errors.password && (
            <ErrorMessage message="8以上25以下の英数字を入力してください" />
          )}
        </div>
        <div className="mt-4">
          <Button className="w-full">送信</Button>
        </div>
        <Maybe
          link={{
            href: PATH.USERS.SIGN_UP,
            text: "ユーザー登録",
          }}
          message="登録されていない方はこちら "
        />
      </form>
    </FormProvider>
  );
};
