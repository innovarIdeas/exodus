import { NextRequest, NextResponse } from "next/server";
import { PERMISSION_CODES } from "@/lib/permissions-code";
import { checkUserPermission } from "@/lib/session-manager";
import prisma from "@/lib/prisma";
import { updateConstantSchema } from "@/models/validation-schema";

export async function PATCH (req: NextRequest, { params }: { params: { id: string } }) {
  const validation = updateConstantSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const { id } = params;
  const updateConstant: { [key: string]: number | string } = {};

  for (const [field, value] of Object.entries(validation.data)) {
    updateConstant[field] = value;
  }

  await prisma.constants.update({
    where: { id },
    data: updateConstant
  });

  return NextResponse.json(updateConstant);
}

export async function DELETE (
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!(await checkUserPermission(PERMISSION_CODES.DELETE_CONSTANT))) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    await prisma.constants.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE request:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
