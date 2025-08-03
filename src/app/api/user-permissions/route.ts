import { NextRequest, NextResponse } from "next/server";
import { claimSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function GET () {
  try {
    const userPermission = await prisma.claim.findMany();

    return NextResponse.json(userPermission);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  try {
    const validation = claimSchema.safeParse(await req.json());

    if (!validation.success) {
      const { error } = validation as import("zod").SafeParseError<typeof claimSchema>;

      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    if (validation.data.type === "ROLE") {
      const role = await prisma.user.update({
        where: { id: validation.data.user_id },
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
        where: { id: validation.data.user_id },
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
