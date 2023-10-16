import { IPermission } from "@/models/models";
import { Session } from "next-auth";

export async function getPermissions (session: Session | null): Promise<IPermission[]> {
  if (!session) return [];

  return [...session?.permissions ?? []];
}
