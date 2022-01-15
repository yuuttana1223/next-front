import { VFC } from "react";
import { BackLink } from "src/components/shared/Link/BackLink";
import { PATH } from "src/urls/path";
import { ReviewForm } from "src/components/Form/ReviewForm";

export const NewReview: VFC = () => {
  return (
    <div>
      <div className="mb-4">
        <BackLink href={PATH.ROOT} />
      </div>
      <ReviewForm />
    </div>
  );
};
