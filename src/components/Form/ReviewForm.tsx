import { VFC, useContext } from "react";
import { useAllReviews } from "src/hooks/useAllReviews";
import { Select } from "src/components/shared/Select";
import { RadioButton } from "src/components/shared/Radio/RadioButton";
import { Textarea } from "src/components/shared/Textarea";
import { Button } from "src/components/shared/Button";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { Review } from "src/types/review";
import { AuthContext } from "src/providers/AuthProvider";
import { patchReview, postReview } from "src/apis/review";
import { useRouter } from "next/router";
import { PATH } from "src/urls/path";
import { useSWRConfig } from "swr";
import { API_URL } from "src/urls/api";
import toast from "react-hot-toast";

export type FormValues = Omit<Review, "id" | "created_at" | "updated_at"> & {
  lecture_name2?: string;
  teacher_name2?: string;
};

type Props = {
  review?: Review;
};

export const ReviewForm: VFC<Props> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { reviews, lectures, teachers } = useAllReviews();
  const methods = useForm<FormValues>();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const onSubmit: SubmitHandler<FormValues> = (params) => {
    if (props.review) {
      patchReview(params, props.review.id)
        .then((res) => {
          mutate(`${API_URL}/reviews/${res.data.id}`, res.data);
          mutate(
            `${API_URL}/reviews`,
            reviews?.map((review) =>
              review.id === res.data.id ? res.data : review
            )
          );
          toast.success("レビューを更新しました", {
            duration: 10000,
          });
          router.push(PATH.REVIEWS.SHOW(res.data.id));
        })
        .catch(() => {
          toast.error("レビュー編集に失敗しました");
        });
    } else {
      postReview(params, currentUser?.id)
        .then((res) => {
          mutate(`${API_URL}/reviews`, [{ ...reviews }, res.data]);
          toast.success("レビューを作成しました", {
            duration: 10000,
          });
          router.push(PATH.REVIEWS.SHOW(res.data.id));
        })
        .catch(() => {
          toast.error("レビュー作成に失敗しました");
        });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-center">
          {props.review ? "レビュー編集" : "レビュー投稿"}
        </h2>
        <div className="max-w-md mx-auto mt-8">
          <div className="grid grid-cols-1 gap-6">
            <Select
              name="lecture_name"
              validation={{ required: true, minLength: 2, maxLength: 25 }}
              labelName="講義名"
              texts={lectures}
              selected={props.review?.lecture_name}
              isOther
            />

            <Select
              name="teacher_name"
              validation={{ required: true, minLength: 2, maxLength: 25 }}
              labelName="担当教員"
              texts={teachers}
              selected={props.review?.teacher_name}
              isOther
            />
            <RadioButton
              name="lesson_type"
              title="授業形式"
              texts={[
                "リアルタイムオンライン",
                "対面",
                "オンデマンド",
                "ハイブリッド",
              ]}
              selected={props.review?.lesson_type}
            />
            <RadioButton
              name="adequacy"
              title="内容充実度"
              texts={["満足", "やや満足", "普通", "やや不満", "不満"]}
              selected={props.review?.adequacy}
            />
            <RadioButton
              name="submission_quantity"
              title="課題の量"
              texts={["多い", "やや多い", "普通", "やや少ない", "少ない"]}
              selected={props.review?.submission_quantity}
            />
            <RadioButton
              name="difficulty"
              title="難易度"
              texts={["難しい", "やや難しい", "普通", "やや易しい", "易しい"]}
              selected={props.review?.difficulty}
            />
            <RadioButton
              name="is_ending_test"
              title="期末テスト"
              texts={["あり", "なし"]}
              selected={
                // 新規投稿のときはundefined, 編集のときは「"あり"」か「"なし"」
                props.review?.is_ending_test
                  ? "あり"
                  : props.review?.is_ending_test === undefined
                  ? undefined
                  : "なし"
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
            <Button className="w-20 ml-auto">送信</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
