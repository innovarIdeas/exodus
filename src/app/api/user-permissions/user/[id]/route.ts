import { NextRequest, NextResponse } from "next/server";
import { claimSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function GET (req: NextRequest, { params }: {params: {id: string}}) {
  const { id } = params;

  try {
    const userPermission = await prisma.claim.findMany({
      where: { user_id: { equals: id } },
      include: { role: true }
    });

    return NextResponse.json(userPermission);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH (req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const validation = claimSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  try {
    if (validation.data.type === "ROLE") {
      const role = await prisma.user.update({
        where: { id: userId },
        data: {
          claims: {
            deleteMany: {},
            create: validation.data.permission_id.map(({ id }) => ({
              role: { connect: { id } },
              type: validation.data.type,
            })),
          },
        },
      });

      return NextResponse.json(role, { status: 201 });
    } else {
      const permission = await prisma.user.update({
        where: { id: userId },
        data: {
          claims: {
            deleteMany: {},
            create: validation.data.permission_id.map(({ id }) => ({
              permission: { connect: { id } },
              type: validation.data.type,
            })),
          },
        },
      });

      return NextResponse.json(permission, { status: 201 });
    }
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" + error }, { status: 500 });
  }
}
