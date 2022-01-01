import type { NextPage } from "next";
import Head from "next/head";
import { NewReview as NewReviewComponent } from "src/components/Review/NewReview";
import { AppLayout } from "src/layouts/AppLayout";

const NewReview: NextPage = () => {
  return (
    <>
      <Head>
        <title>New KCG Review</title>
        <meta name="description" content="授業評価投稿ページ" />
      </Head>
      <AppLayout>
        <NewReviewComponent />
      </AppLayout>
    </>
  );
};

export default NewReview;
