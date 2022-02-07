import { useReviewComments } from "src/hooks/useReviewComments";
import { VFC, useContext, useCallback, useState } from "react";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { AuthContext } from "src/providers/AuthProvider";
import { DropDown } from "src/components/Dropdown";
import { Comment, deleteComment } from "src/apis/reviewComment";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { API_URL } from "src/urls/api";
import { DeleteModal } from "src/components/Modal/DeleteModal";

type Props = {
  reviewId?: number;
  handleEdit: (comment: Comment) => void;
};

export const CommentList: VFC<Props> = (props) => {
  const { comments, commentsError, commentsLoading } = useReviewComments(
    props.reviewId
  );
  const { mutate } = useSWRConfig();
  const format = formatDistanceToNow;
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
      deleteComment(props.reviewId, commentId)
        .then(() => {
          mutate(
            `${API_URL}/reviews/${props.reviewId}/comments`,
            comments?.filter((comment) => comment.id !== commentId)
          );
          toast.success("コメントを削除しました");
        })
        .catch(() => {
          toast.error("コメントの削除に失敗しました");
        });
    },
    [closeModal, comments, mutate, props.reviewId]
  );

  if (commentsLoading) {
    return <Loader />;
  }

  if (commentsError) {
    return <ErrorMessage message={commentsError.message} />;
  }

  return (
    <div className="space-y-4 w-full">
      {comments?.map((comment) => (
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
        message="コメントを削除してもよろしいですか？"
        closeModal={closeModal}
        handleDelete={() => handleDelete(openState.commentId)}
      />
    </div>
  );
};
