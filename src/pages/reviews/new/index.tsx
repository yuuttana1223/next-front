import type { NextPage } from "next";
import Head from "next/head";
import { NewReview as NewReviewComponent } from "src/components/Review/NewReview";
import { AppLayout } from "src/layouts/AppLayout";
import { ProtectUserRoute } from "src/routes/ProtectUserRoute";

const NewReview: NextPage = () => {
  return (
    <ProtectUserRoute>
      <Head>
        <title>New KCG Review</title>
        <meta name="description" content="授業評価投稿ページ" />
      </Head>
      <AppLayout>
        <NewReviewComponent />
      </AppLayout>
    </ProtectUserRoute>
  );
};

export default NewReview;
