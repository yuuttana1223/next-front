import type { NextPage } from "next";
import Head from "next/head";
import { ReviewList } from "src/components/Review/ReviewList";
import { AppLayout } from "src/layouts/AppLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KCG Reviews</title>
        <meta name="description" content="授業評価一覧" />
      </Head>
      <AppLayout>
        <ReviewList />
      </AppLayout>
    </>
  );
};

export default Home;
