import { VFC, useContext } from "react";
import { Button } from "src/components/shared/Button";
import { FloatingLabelInput } from "src/components/shared/Input/FloatingLabelInput";
import { Maybe } from "src/components/Authentication/Message/Maybe";
import { PATH } from "src/urls/path";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ErrorMessage } from "src/components/Authentication/Message/ErrorMessage";
import { reg } from "src/constants/email";
import { signUp } from "src/apis/auth";
import Cookies from "js-cookie";
import { AuthContext } from "src/providers/AuthProvider";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

type Inputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const SignUpForm: VFC = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const router = useRouter();

  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (params) => {
    signUp(params)
      .then((res) => {
        if (res.status === 200) {
          Cookies.set("access_token", res.headers["access-token"]);
          Cookies.set("client", res.headers["client"]);
          Cookies.set("uid", res.headers["uid"]);
          setAuthState((prevAuthState) => {
            return {
              ...prevAuthState,
              isSignedIn: true,
              currenUser: res.data,
            };
          });
          router.push(PATH.ROOT);
        } else {
          console.log("登録できませんでした。");
        }
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  if (authState.loading) {
    return <>ローディング</>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 className="text-3xl text-center md:mb-8">ユーザー登録</h1>
        <div className="my-2">
          <FloatingLabelInput
            type="name"
            name="name"
            placeholder="名前"
            validation={{ minLength: 2, maxLength: 20 }}
          />
          {methods.formState.errors.name && (
            <ErrorMessage message="2以上20以下の文字を入力してください" />
          )}
        </div>
        <div className="my-2">
          <FloatingLabelInput
            type="email"
            name="email"
            placeholder="メールアドレス"
            validation={{
              pattern: reg,
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
            validation={{ minLength: 8, maxLength: 25 }}
          />
          <p className="my-2 text-xs text-gray-400">
            8桁以上25桁以下の英数字を入力してください
          </p>

          {methods.formState.errors.password && (
            <ErrorMessage message="8以上25以下の英数字を入力してください" />
          )}
        </div>
        <div className="my-2">
          <FloatingLabelInput
            type="password"
            name="password_confirmation"
            placeholder="パスワード確認"
            validation={{ minLength: 8, maxLength: 25 }}
          />
          {methods.control._formValues["password"] !==
            methods.control._formValues["password_confirmation"] && (
            <ErrorMessage message="パスワードが一致していません" />
          )}
        </div>
        <div className="mt-4">
          <Button>登録</Button>
        </div>
        <Maybe
          link={{
            href: PATH.USERS.SIGN_IN,
            text: "ログイン",
          }}
          message="登録済みの方はこちら "
        />
      </form>
    </FormProvider>
  );
};
