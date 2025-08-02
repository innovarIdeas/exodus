import { NextRequest, NextResponse } from "next/server";
import { couponSchema } from "@/models/validation-schema";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function GET () {
  try {
    const staff = await prisma.coupon.findMany({ where: { deleted_at: null }, include: { created_by_user: true } });

    return NextResponse.json(staff);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  const session = await getServerSession(options);

  try {
    const validation = couponSchema.safeParse(await req.json());

    if (!validation.success) {
      const { error } = validation as import("zod").SafeParseError<typeof couponSchema>;

      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, percentage, ...rest } = validation.data;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
    }

    if (typeof percentage !== "number") {
      return NextResponse.json({ error: "Missing required field: percentage" }, { status: 400 });
    }

    const user = await prisma.coupon.create({
      data: {
        ...rest,
        name,
        percentage,
        created_by_user: { connect: { id: session.user.id } },
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
