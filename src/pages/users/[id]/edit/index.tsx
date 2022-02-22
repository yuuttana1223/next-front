import type { NextPage } from "next";
import Head from "next/head";
import { AppLayout } from "src/layouts/AppLayout";
import { EditUser as EditUserComponent } from "src/components/User/EditUser";
import { ProtectUserRoute } from "src/routes/ProtectUserRoute";
import { CorrectUserRoute } from "src/routes/CorrectUserRoute";
import { Container } from "src/layouts/Container";

const EditUser: NextPage = () => {
  return (
    <ProtectUserRoute>
      <CorrectUserRoute>
        <Head>
          <title>Edit User</title>
          <meta name="description" content="ユーザー編集" />
        </Head>
        <AppLayout className="bg-gray-100">
          <Container>
            <EditUserComponent />
          </Container>
        </AppLayout>
      </CorrectUserRoute>
    </ProtectUserRoute>
  );
};

export default EditUser;
