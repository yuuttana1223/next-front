import type { NextPage } from "next";
import Head from "next/head";
import { AppLayout } from "src/layouts/AppLayout";
import { EditUser as EditUserComponent } from "src/components/User/EditUser";

const EditUser: NextPage = () => {
  return (
    <>
      <Head>
        <title>KCG Reviews</title>
        <meta name="description" content="ユーザー編集" />
      </Head>
      <AppLayout>
        <EditUserComponent />
      </AppLayout>
    </>
  );
};

export default EditUser;
