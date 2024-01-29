import { getPermissions } from "@/lib/server";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { usePermissions } from "@/lib/hook";

export async function getUserSessionAndPermissions () {
  const session = await getServerSession(options);

  return { session };
}

export async function checkUserPermission (requiredPermissions: string[]) {
  try {
    const session = await getServerSession(options);
    const permissions = await getPermissions(session);

    return requiredPermissions.some(requiredPermission => permissions.some(permission =>
      permission.code.includes(requiredPermission)
    )
    );
  } catch (error) {
    console.error("Error checking user permission:", error);

    return false;
  }
}

export function ChecksUserPermission (requiredPermissions: string[]) {
  try {
    const [, permissions] = usePermissions();

    return requiredPermissions.some(requiredPermission => permissions.some(permission =>
      permission.code.includes(requiredPermission)
    )
    );
  } catch (error) {
    console.error("Error checking user permission:", error);

    return false;
  }
}
