import type { NextPage } from "next";
import Head from "next/head";
import { Review as ReviewComponent } from "src/components/Review/Review";
import { AppLayout } from "src/layouts/AppLayout";
import { ProtectUserRoute } from "src/routes/ProtectUserRoute";

const Review: NextPage = () => {
  return (
    <ProtectUserRoute>
      <Head>
        <title>KCG Review</title>
        <meta name="description" content="授業評価詳細ページ" />
      </Head>
      <AppLayout>
        <ReviewComponent />
      </AppLayout>
    </ProtectUserRoute>
  );
};

export default Review;
