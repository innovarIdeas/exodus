import { NextRequest, NextResponse } from "next/server";
import { ROLE_OWNER,  ROLE_STAFF } from "@/lib/rbac";
import { CLAIM_TYPE } from "@/models/constant";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { userSchema } from "@/models/validation-schema";

export async function GET () {
  try {
    const staff = await prisma.user.findMany({
      where: {
        NOT: { claims: { some: { role: { name: ROLE_OWNER } } } },
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        claims: { select: { role: true } },
        created_at: true,
      },
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST (req: NextRequest) {
  try {
    const validation = userSchema.safeParse(await req.json());

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(validation.data.password, 10);
    const role = await prisma.role.findUnique({ where: { name: ROLE_STAFF } });

    if (!role) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    const user = await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        password: hashedPassword,
        claims: { create: { role_id: role?.id, type: CLAIM_TYPE.ROLE } },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
