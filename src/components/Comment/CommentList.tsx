import { VFC, useContext, useCallback, useState, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { AuthContext } from "src/providers/AuthProvider";
import { DropDown } from "src/components/Dropdown";
import { deleteComment } from "src/apis/reviewComment";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { API_URL } from "src/urls/api";
import { DeleteModal } from "src/components/Modal/DeleteModal";
import { useAllComments } from "src/hooks/useAllComments";
import { useRouter } from "next/router";
import { STATUS_CODE } from "src/utils/statusCode";

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleEdit: (commentId?: number, body?: string) => void;
};

export const CommentList: VFC<Props> = (props) => {
  const { comments } = useAllComments();
  const { mutate } = useSWRConfig();
  const format = formatDistanceToNow;
  const router = useRouter();
  const reviewId = useMemo(() => Number(router.query.id), [router]);
  const { currentUser } = useContext(AuthContext);
  const [openState, setOpenState] = useState<{
    isOpen: boolean;
    commentId?: number;
  }>({
    isOpen: false,
    commentId: undefined,
  });

  const openModal = useCallback((commentId: number) => {
    setOpenState({
      isOpen: true,
      commentId: commentId,
    });
  }, []);

  const closeModal = useCallback(() => {
    setOpenState({
      isOpen: false,
      commentId: undefined,
    });
  }, []);

  const handleDelete = useCallback(
    (commentId?: number) => {
      closeModal();
      deleteComment(reviewId, commentId)
        .then((res) => {
          if (res.status === STATUS_CODE.NO_CONTENT) {
            mutate(
              `${API_URL}/comments`,
              comments?.filter((comment) => comment.id !== commentId)
            );
            toast.success("コメントを削除しました");
          } else [toast.error("コメントの削除に失敗しました")];
        })
        .catch(() => {
          toast.error("コメントの削除に失敗しました");
        });
    },
    [closeModal, comments, mutate, reviewId]
  );

  return (
    <div className="space-y-4 w-full">
      {comments
        ?.filter((comment) => comment.review_id === reviewId)
        .map((comment) => (
          <div key={comment.id} className="relative pr-8 break-words">
            <span className="text-gray-900">{comment.username}</span>
            <time className="ml-2 text-sm text-gray-500">
              {format(new Date(comment.updated_at), {
                addSuffix: true,
                locale: ja,
              })}
              <span className="ml-1">
                {comment.created_at !== comment.updated_at && "(編集済み)"}
              </span>
            </time>
            <p className="text-gray-700">{comment.body}</p>
            {currentUser?.id === comment.user_id && (
              <div>
                <DropDown
                  handleEdit={props.handleEdit}
                  openModal={openModal}
                  comment={comment}
                />
              </div>
            )}
          </div>
        ))}
      <DeleteModal
        isOpen={openState.isOpen}
        message="コメントを完全に削除しますか？"
        closeModal={closeModal}
        handleDelete={() => handleDelete(openState.commentId)}
      />
    </div>
  );
};
