import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateRoleSchema } from "@/models/validation-schema";

export async function PATCH (req: NextRequest, { params }: {params: {id: string}}) {
  const { id } = params;
  const validation = updateRoleSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: "validation error" }, { status: 400 });
  }

  const role = await prisma.role.update({
    where: { id },
    data: {
      name: validation.data.name,
      built_in: validation.data.built_in,
      active: validation.data.active,
      permissions: {
        deleteMany: {},
        create: validation.data.permissions_ids?.map((permission) => ({ permission_id: permission.id, active: true })),
      }
    },
  });

  return NextResponse.json(role);
}

export async function GET (req: NextRequest, { params }: {params: {id: string}}) {
  const { id } = params;

  const role = await prisma.role.findUnique({
    where: { id },
    include: { permissions: { include: { permission: true } } },
  });

  return NextResponse.json(role);
}

