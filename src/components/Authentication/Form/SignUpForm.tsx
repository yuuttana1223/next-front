import { VFC } from "react";
import { Button } from "src/components/shared/Button";
import { FloatingLabelInput } from "src/components/shared/Input/FloatingLabelInput";
import { Maybe } from "src/components/Authentication/Message/Maybe";
import { PATH } from "src/urls/path";

export const SignUpForm: VFC = () => {
  return (
    <form className="space-y-4">
      <h1 className="mb-8 text-3xl text-center">ユーザー登録</h1>
      <FloatingLabelInput
        input={{ type: "name", name: "name", placeholder: "名前" }}
      />
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
      <Button>登録</Button>
      <Maybe
        link={{
          href: PATH.USERS.SIGN_IN,
          text: "ログイン",
        }}
        message="登録済みの方はこちら "
      />
    </form>
  );
};
