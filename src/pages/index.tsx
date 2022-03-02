import type { NextPage } from "next";
import Head from "next/head";
import { Reviews } from "src/components/Review/Reviews";
import { AppLayout } from "src/layouts/AppLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KCG Reviews</title>
        <meta name="description" content="授業評価一覧" />
      </Head>
      <AppLayout isSearchInput>
        <Reviews />
      </AppLayout>
    </>
  );
};

export default Home;
