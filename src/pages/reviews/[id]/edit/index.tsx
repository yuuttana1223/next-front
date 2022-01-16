import type { NextPage } from "next";
import Head from "next/head";
import { AppLayout } from "src/layouts/AppLayout";
import { EditReview as EditReviewComponent } from "src/components/Review/EditReview";

const EditReview: NextPage = () => {
  return (
    <>
      <Head>
        <title>Edit KCG Review</title>
        <meta name="description" content="授業評価編集ページ" />
      </Head>
      <AppLayout>
        <EditReviewComponent />
      </AppLayout>
    </>
  );
};

export default EditReview;
