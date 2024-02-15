import { NextRequest, NextResponse } from "next/server";
import { PERMISSION_CODES } from "@/lib/permissions-code";
import { checkUserPermission } from "@/lib/session-manager";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET () {
  try {
    const constantdata = await prisma.constants.findMany({ orderBy: { created_at: "asc" } });

    return NextResponse.json(constantdata);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE (req: NextRequest, { params }: {params: {id: string}}) {
  try {
    const { id } = params;

    if (!await checkUserPermission(PERMISSION_CODES.ADMIN)) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    await prisma.constants.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
