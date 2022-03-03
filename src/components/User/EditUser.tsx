import { VFC, useContext, useState } from "react";
import { Button } from "src/components/shared/Button";
import { FloatingLabelInput } from "src/components/shared/Input/FloatingLabelInput";
import { PATH } from "src/urls/path";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useRouter } from "next/router";
import { AuthContext } from "src/providers/AuthProvider";
import { patchUser } from "src/apis/auth";
import toast from "react-hot-toast";
import { ProcessingLoader } from "src/components/Loader/ProcessingLoader";

export type Inputs = {
  name: string;
};

export const EditUser: VFC = () => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const router = useRouter();
  const methods = useForm<Inputs>();
  const [processing, setProcessing] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (params) => {
    setProcessing(true);
    patchUser(params, currentUser?.id)
      .then((res) => {
        if (res.status === 200) {
          setCurrentUser(res.data);
          toast.success("ユーザー情報を更新しました");
          router.push(PATH.ROOT);
        } else {
          toast.error("ユーザー情報の更新に失敗しました");
        }
      })
      .catch(() => {
        toast.error("ユーザー情報の更新に失敗しました");
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 className="mb-8 text-2xl text-center">ユーザー編集</h1>
        <div className="my-2">
          <FloatingLabelInput
            type="text"
            name="name"
            value={currentUser?.name}
            autocomplete="on"
            placeholder="名前"
            validation={{ required: true, minLength: 2, maxLength: 20 }}
          />
          {methods.formState.errors.name && (
            <ErrorMessage message="2以上20以下の文字を入力してください" />
          )}
        </div>
        <div className="mt-4">
          {processing ? (
            <Button type="button" className="w-full">
              <ProcessingLoader className="mr-2" />
              送信中...
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              送信
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
