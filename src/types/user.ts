export type User = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
};
