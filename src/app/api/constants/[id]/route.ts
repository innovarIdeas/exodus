import { NextRequest, NextResponse } from "next/server";
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
