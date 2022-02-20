import { VFC, useContext } from "react";
import { Button } from "src/components/shared/Button";
import { FloatingLabelInput } from "src/components/shared/Input/FloatingLabelInput";
import { PATH } from "src/urls/path";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useRouter } from "next/router";
import { AuthContext } from "src/providers/AuthProvider";
import { patchUser } from "src/apis/auth";
import toast from "react-hot-toast";

export type Inputs = {
  name: string;
};

export const EditUser: VFC = () => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const router = useRouter();
  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (params) => {
    patchUser(params, currentUser?.id)
      .then((res) => {
        setCurrentUser(res.data);
        toast.success("ユーザー情報を更新しました");
        router.push(PATH.ROOT);
      })
      .catch(() => {
        toast.error("ユーザー情報の更新に失敗しました");
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 className="mb-8 text-2xl text-center">ユーザー編集</h1>
        <div className="my-2">
          <FloatingLabelInput
            type="name"
            name="name"
            value={currentUser?.name}
            placeholder="名前"
            validation={{ required: true, minLength: 2, maxLength: 20 }}
          />
          {methods.formState.errors.name && (
            <ErrorMessage message="2以上20以下の文字を入力してください" />
          )}
        </div>
        <div className="mt-4">
          <Button className="w-full">送信</Button>
        </div>
      </form>
    </FormProvider>
  );
};
