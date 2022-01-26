import type { NextPage } from "next";
import Head from "next/head";
import { AppLayout } from "src/layouts/AppLayout";
import { EditReview as EditReviewComponent } from "src/components/Review/EditReview";
import { ProtectUserRoute } from "src/routes/ProtectUserRoute";
import { CorrectReviewUserRoute } from "src/routes/CorrectReviewUserRoute";

const EditReview: NextPage = () => {
  return (
    <ProtectUserRoute>
      <CorrectReviewUserRoute>
        <Head>
          <title>Edit KCG Review</title>
          <meta name="description" content="授業評価編集ページ" />
        </Head>
        <AppLayout>
          <EditReviewComponent />
        </AppLayout>
      </CorrectReviewUserRoute>
    </ProtectUserRoute>
  );
};

export default EditReview;
