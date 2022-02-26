import { VFC, useState } from "react";
import { useAllReviews } from "src/hooks/useAllReviews";
import { Select } from "src/components/shared/Select";
import { RadioButton } from "src/components/shared/Radio/RadioButton";
import { Textarea } from "src/components/shared/Textarea";
import { Button } from "src/components/shared/Button";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { Review } from "src/apis/review";
import { patchReview, postReview } from "src/apis/review";
import { useRouter } from "next/router";
import { PATH } from "src/urls/path";
import { useSWRConfig } from "swr";
import { API_URL } from "src/urls/api";
import toast from "react-hot-toast";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { ProcessingLoader } from "src/components/Loader/ProcessingLoader";

export type FormValues = Omit<Review, "id" | "created_at" | "updated_at"> & {
  lecture_name2?: string;
  teacher_name2?: string;
};

type Props = {
  review?: Review;
};

export const ReviewForm: VFC<Props> = (props) => {
  const { reviews, lectures, teachers, reviewsLoading, reviewsError } =
    useAllReviews();

  const methods = useForm<FormValues>();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const { mutate } = useSWRConfig();
  const onSubmit: SubmitHandler<FormValues> = (params) => {
    setProcessing(true);
    if (props.review) {
      patchReview(params, props.review.id)
        .then((res) => {
          if (res.status === 200) {
            mutate(
              `${API_URL}/reviews`,
              reviews?.map((review) =>
                review.id === res.data.id ? res.data : review
              )
            );
            toast.success("レビューを更新しました");
            router.push(PATH.REVIEWS.SHOW(res.data.id));
          } else {
            toast.error("レビューの更新に失敗しました");
          }
        })
        .catch(() => {
          toast.error("レビュー更新に失敗しました");
        })
        .finally(() => {
          setProcessing(false);
        });
    } else {
      postReview(params)
        .then((res) => {
          if (res.status === 201) {
            mutate(`${API_URL}/reviews`, [{ ...reviews }, res.data]);
            toast.success("レビューを作成しました", {
              duration: 10000,
            });
            router.push(PATH.REVIEWS.SHOW(res.data.id));
          } else {
            toast.error("レビューの作成に失敗しました");
          }
        })
        .catch(() => {
          toast.error("レビュー作成に失敗しました");
        });
    }
  };

  if (reviewsLoading) {
    return <Loader />;
  }

  if (reviewsError) {
    return <ErrorMessage message={reviewsError.message} />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-center">
          {props.review ? "レビュー編集" : "レビュー投稿"}
        </h2>
        <div className="mx-auto mt-8 max-w-md">
          <div className="grid grid-cols-1 gap-6">
            <Select
              name="lecture_name"
              validation={{ required: true, minLength: 2, maxLength: 25 }}
              labelName="講義名"
              placeholder="例. Java実習1"
              texts={lectures}
              selected={props.review?.lecture_name}
              isOther
            />

            <Select
              name="teacher_name"
              validation={{ required: true, minLength: 2, maxLength: 25 }}
              labelName="担当教員"
              placeholder="例. 前納一希"
              texts={teachers}
              selected={props.review?.teacher_name}
              isOther
            />
            <RadioButton
              name="lesson_type"
              title="授業形式"
              texts={[
                "対面",
                "リアルタイムオンライン",
                "オンデマンド",
                "ハイブリッド",
              ]}
              selected={props.review?.lesson_type}
            />
            <RadioButton
              name="level_of_satisfaction"
              title="内容充実度"
              texts={["大変不満", "不満", "普通", "満足", "大変満足"]}
              selected={props.review?.level_of_satisfaction}
            />
            <RadioButton
              name="workload"
              title="課題の量"
              texts={["大変少ない", "少ない", "普通", "多い", "大変多い"]}
              selected={props.review?.workload}
            />
            <RadioButton
              name="difficulty"
              title="難易度"
              texts={["大変易しい", "易しい", "普通", "難しい", "大変難しい"]}
              selected={props.review?.difficulty}
            />
            <RadioButton
              name="is_ending_test"
              title="期末テスト"
              values={["true", "false"]}
              texts={["あり", "なし"]}
              selected={
                // 新規投稿のときはundefined, 編集のときは「"あり"」か「"なし"」
                props.review?.is_ending_test === true
                  ? "true"
                  : props.review?.is_ending_test === false
                  ? "false"
                  : undefined
              }
            />
            <Textarea
              name="content"
              labelName="内容"
              rows={5}
              placeholder="授業の感想などを書いてください"
              validation={{ required: true, maxLength: 500 }}
              selected={props.review?.content}
            />
            {processing ? (
              <Button type="button" disabled className="ml-auto w-24">
                <ProcessingLoader />
                <span>送信中...</span>
              </Button>
            ) : (
              <Button type="submit" className="ml-auto w-24">
                <span>送信</span>
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
