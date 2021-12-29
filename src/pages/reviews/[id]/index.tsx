import type { NextPage } from "next";
import Head from "next/head";
import { Review as ReviewComponent } from "src/components/Review/Review";
import { AppLayout } from "src/layouts/AppLayout";

const Review: NextPage = () => {
  return (
    <>
      <Head>
        <title>KCG Review</title>
        <meta name="description" content="授業評価詳細ページ" />
      </Head>
      <AppLayout>
        <ReviewComponent />
      </AppLayout>
    </>
  );
};

export default Review;
