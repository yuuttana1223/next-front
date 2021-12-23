import { VFC } from "react";
import { Button } from "src/components/shared/Button";
import { FloatingLabelInput } from "src/components/shared/Input/FloatingLabelInput";
import { Maybe } from "src/components/Authentication/Message/Maybe";
import { PATH } from "src/urls/path";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ErrorMessage } from "src/components/Authentication/Message/ErrorMessage";

type Inputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const SignUpForm: VFC = () => {
  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
              pattern:
                /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/,
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
