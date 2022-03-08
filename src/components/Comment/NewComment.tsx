import { useState, useCallback, VFC, useEffect, ChangeEvent } from "react";
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

export const NewComment: VFC<Props> = (props) => {
  const { mutate } = useSWRConfig();
  const { comments } = useAllComments();
  const [inputState, setInputState] = useState({
    body: props.comment.body ?? "",
    isFocus: false,
  });
  const router = useRouter();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputState({
        ...inputState,
        body: e.target.value,
      });
    },
    [inputState]
  );

  const handleClick = () => {
    if (!comments || !inputState.body) {
      return;
    }
    const reviewId = Number(router.query.id);
    setInputState({
      body: "",
      isFocus: false,
    });
    if (props.comment.id) {
      patchComment(inputState.body, reviewId, props.comment.id)
        .then((res) => {
          if (res.status === 200) {
            props.handleEdit(undefined, "");
            mutate(
              `${API_URL}/comments`,
              comments.map((comment) =>
                comment.id === props.comment.id ? res.data : comment
              )
            );
            toast.success("コメントを更新しました");
          } else {
            toast.error("コメントの更新に失敗しました");
          }
        })
        .catch(() => {
          toast.error("コメントの更新に失敗しました");
        });
    } else {
      postComment(inputState.body, reviewId)
        .then((res) => {
          if (res.status === 201) {
            mutate(`${API_URL}/comments`, [...comments, res.data]);
            toast.success("コメントを投稿しました");
          } else {
            toast.error("コメントの投稿に失敗しました");
          }
        })
        .catch(() => {
          toast.error("コメントの投稿に失敗しました");
        });
    }
  };

  const handleCancel = useCallback(() => {
    setInputState({
      body: "",
      isFocus: false,
    });
    props.handleEdit(undefined, "");
  }, [props]);

  useEffect(() => {
    setInputState((prevInputState) => ({
      ...prevInputState,
      body: props.comment.body ?? "",
    }));
  }, [props.comment.body]);

  return (
    <div className="group relative z-0 mb-6 w-full">
      {inputState.body.length > 500 && (
        <ErrorMessage
          message="500文字以内で入力してください"
          className="inline -mb-10 font-normal"
        />
      )}
      <input
        type="text"
        autoComplete="off"
        name="body"
        value={inputState.body}
        onChange={handleChange}
        className="peer block py-2 w-full text-sm text-gray-900 bg-transparent rounded-none border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0"
        placeholder=" "
        onFocus={() =>
          setInputState((prevInputState) => ({
            ...prevInputState,
            isFocus: true,
          }))
        }
        onBlur={() =>
          setInputState((prevInputState) => ({
            ...prevInputState,
            isFocus: false,
          }))
        }
      />
      <label
        htmlFor="body"
        className="flex absolute top-3 peer-focus:left-0 -z-10 text-sm text-gray-500 peer-focus:text-blue-600 duration-300 scale-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 -translate-y-6 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 origin-[0]"
      >
        <div>
          <p className="w-full">授業の評価に対するコメント</p>
        </div>
      </label>
      {(inputState.isFocus || inputState.body || props.comment.id) && (
        <div className="mt-1 text-right">
          <button
            type="button"
            onClick={handleCancel}
            className="p-2 mr-2 mb-2 text-sm font-medium text-center text-gray-400 hover:bg-gray-100 rounded-sm border border-gray-300 focus:ring-4 focus:ring-blue-300 md:px-3"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleClick}
            disabled={!inputState.body}
            className={`py-2 px-4 mb-2 text-sm font-medium text-center   ${
              inputState.body
                ? "hover:bg-blue-700 bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400"
            } rounded-sm border border-gray-300 focus:ring-4 focus:ring-blue-300 md:px-5`}
          >
            {props.comment.id ? "保存" : "コメント"}
          </button>
        </div>
      )}
    </div>
  );
};
