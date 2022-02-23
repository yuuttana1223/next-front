import type { NextPage } from "next";
import Head from "next/head";
import { AppLayout } from "src/layouts/AppLayout";
import { ProtectUserRoute } from "src/routes/ProtectUserRoute";
import { CorrectUserRoute } from "src/routes/CorrectUserRoute";
import { FavoriteReviews as FavoriteReviewsComponent } from "src/components/Review/FavoriteReviews";

const FavoriteReviews: NextPage = () => {
  return (
    <ProtectUserRoute>
      <CorrectUserRoute>
        <Head>
          <title>Favorite User</title>
          <meta name="description" content="お気に入り一覧" />
        </Head>
        <AppLayout>
          <FavoriteReviewsComponent />
        </AppLayout>
      </CorrectUserRoute>
    </ProtectUserRoute>
  );
};

export default FavoriteReviews;
