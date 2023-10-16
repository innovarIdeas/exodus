import { IPermission } from "@/models/models";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface Session extends DefaultSession {
    user: User;
    permissions: IPermission[];
  }
}
