import type { NextPage } from "next";
import Head from "next/head";
import { AppLayout } from "src/layouts/AppLayout";
import { EditUser as EditUserComponent } from "src/components/User/EditUser";
import { ProtectUserRoute } from "src/routes/ProtectUserRoute";
import { CorrectUserRoute } from "src/routes/CorrectUserRoute";

const EditUser: NextPage = () => {
  return (
    <ProtectUserRoute>
      <CorrectUserRoute>
        <Head>
          <title>KCG Reviews</title>
          <meta name="description" content="ユーザー編集" />
        </Head>
        <AppLayout>
          <EditUserComponent />
        </AppLayout>
      </CorrectUserRoute>
    </ProtectUserRoute>
  );
};

export default EditUser;
