import { VFC } from "react";
import { useAllReviews } from "src/hooks/useAllReviews";
import { Select } from "src/components/shared/Select";
import { RadioButton } from "src/components/shared/Radio/RadioButton";
import { Textarea } from "src/components/shared/Textarea";
import { Button } from "src/components/shared/Button";

export const ReviewForm: VFC = () => {
  const { reviews } = useAllReviews();

  return (
    <form>
      <h2 className="text-2xl font-bold text-center">レビュー投稿</h2>
      <div className="max-w-md mx-auto mt-8">
        <div className="grid grid-cols-1 gap-6">
          <Select
            labelName="講義名"
            texts={reviews?.map((review) => review.lecture_name)}
            isOther
          />
          <Select
            labelName="担当教員"
            texts={reviews?.map((review) => review.teacher_name)}
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
          />
          <RadioButton
            name="adequacy"
            title="内容充実度"
            texts={["満足", "やや満足", "普通", "やや不満", "不満"]}
          />
          <RadioButton
            name="submission_quantity"
            title="課題の量"
            texts={["多い", "やや多い", "普通", "やや少ない", "少ない"]}
          />
          <RadioButton
            name="difficulty"
            title="難易度"
            texts={["難しい", "やや難しい", "普通", "やや易しい", "易しい"]}
          />
          <RadioButton
            name="is_ending_test"
            title="期末テスト"
            texts={["あり", "なし"]}
          />
          <Textarea
            name="content"
            labelName="内容"
            rows={5}
            placeholder="授業の感想などを書いてください"
          />
          <Button className="w-20 ml-auto">送信</Button>
        </div>
      </div>
    </form>
  );
};
