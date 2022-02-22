import { useState, useCallback, VFC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { postComment } from "src/apis/reviewComment";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { API_URL } from "src/urls/api";
import { patchComment } from "src/apis/reviewComment";
import { CommentState } from "src/components/Review/Review";
import { useAllComments } from "src/hooks/useAllComments";
import { useRouter } from "next/router";

type Props = {
  handleEdit: (commentId?: number, body?: string) => void;
  comment: CommentState;
};

export type CommentValue = {
  body: string;
};

export const CommentForm: VFC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CommentValue>();
  const { mutate } = useSWRConfig();
  const { comments } = useAllComments();
  const router = useRouter();

  const onSubmit = (params: CommentValue) => {
    if (!comments) {
      return;
    }
    const reviewId = Number(router.query.id);
    setValue("body", "");
    if (props.comment.id) {
      patchComment(params, reviewId, props.comment.id)
        .then((res) => {
          props.handleEdit(undefined, "");
          mutate(
            `${API_URL}/comments`,
            comments.map((comment) =>
              comment.id === props.comment.id ? res.data : comment
            )
          );
          toast.success("コメントを更新しました");
        })
        .catch(() => {
          toast.error("コメントの更新に失敗しました");
        });
    } else {
      postComment(params, reviewId)
        .then((res) => {
          mutate(`${API_URL}/comments`, [...comments, res.data]);
          toast.success("コメントを投稿しました");
        })
        .catch(() => {
          toast.error("コメントの投稿に失敗しました");
        });
    }
  };

  const [isFocus, setIsFocus] = useState(false);
  const handleCancel = useCallback(() => {
    setIsFocus(false);
    props.handleEdit(undefined, "");
    setValue("body", "");
  }, [props, setValue]);

  useEffect(() => {
    setValue("body", props.comment.body ?? "");
  }, [props.comment.body, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="group relative z-0 mb-6 w-full"
    >
      <input
        autoComplete="off"
        type="text"
        {...register("body", { required: true, maxLength: 500 })}
        className="peer block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0 appearance-none"
        placeholder=" "
        required
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <label
        htmlFor="body"
        className=" absolute top-3 peer-focus:left-0 -z-10 text-sm text-gray-500 peer-focus:text-blue-600 duration-300 scale-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 -translate-y-6 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 origin-[0]"
      >
        授業の評価に対するコメント{" "}
        {errors.body && (
          <ErrorMessage
            message="500文字以内で入力してください"
            className="inline"
          />
        )}
      </label>
      {(isFocus || watch("body") || props.comment.id) && (
        <div className="mt-1 text-right">
          <button
            type="button"
            onClick={handleCancel}
            className="p-2 mr-2 mb-2 text-sm font-medium text-center text-gray-400 hover:bg-gray-100 rounded-sm border border-gray-300 focus:ring-4 focus:ring-blue-300 md:px-3"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={!watch("body")}
            onClick={handleSubmit(onSubmit)}
            className={`py-2 px-4 mr-2 mb-2 text-sm font-medium text-center   ${
              watch("body")
                ? "hover:bg-blue-700 bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400"
            } rounded-sm border border-gray-300 focus:ring-4 focus:ring-blue-300 md:px-5`}
          >
            {props.comment.id ? "保存" : "コメント"}
          </button>
        </div>
      )}
    </form>
  );
};
