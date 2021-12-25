import { VFC } from "react";
import { Button } from "src/components/shared/Button";
import { FloatingLabelInput } from "src/components/shared/Input/FloatingLabelInput";
import { Maybe } from "src/components/Authentication/Message/Maybe";
import { PATH } from "src/urls/path";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ErrorMessage } from "src/components/Authentication/Message/ErrorMessage";
import { reg } from "src/constants/email";
import axios from "axios";
import { API_URL } from "src/urls/api";

export type Inputs = {
  email: string;
  password: string;
};

export const SignInForm: VFC = () => {
  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post(`${API_URL}/auth/sign_in`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
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
        <div className="mt-4">
          <Button>送信</Button>
        </div>
        <Maybe
          link={{
            href: PATH.USERS.SIGN_UP,
            text: "ユーザー登録",
          }}
          message="登録済みの方はこちら "
        />
      </form>
    </FormProvider>
  );
};
