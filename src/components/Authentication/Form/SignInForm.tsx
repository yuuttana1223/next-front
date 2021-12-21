import { VFC } from "react";
import { Button } from "src/components/shared/Button";
import { FloatingLabelInput } from "src/components/shared/Input/FloatingLabelInput";
import { Maybe } from "src/components/Authentication/Message/Maybe";
import { PATH } from "src/urls/path";

export const SignInForm: VFC = () => {
  return (
    <form className="space-y-4">
      <h1 className="mb-8 text-3xl text-center">ログイン</h1>
      <FloatingLabelInput
        input={{ type: "email", name: "email", placeholder: "メールアドレス" }}
      />
      <FloatingLabelInput
        input={{
          type: "password",
          name: "password",
          placeholder: "パスワード",
        }}
      />
      <span className="text-xs text-gray-400">
        英数字○桁以上のパスワードを入力してください
      </span>
      <Button>送信</Button>
      <Maybe
        link={{
          href: PATH.USERS.SIGN_UP,
          text: "ユーザー登録",
        }}
        message="登録済みの方はこちら "
      />
    </form>
  );
};
