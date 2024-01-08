import { NextRequest, NextResponse } from "next/server";
import { discountSchema } from "@/models/validation-schema";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function GET () {
  try {
    const staff = await prisma.discount.findMany({ where: { deleted_at: null }, include: { created_by_user: true, book: true } });

    return NextResponse.json(staff);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  const session = await getServerSession(options);

  try {
    const validation = discountSchema.safeParse(await req.json());

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.discount.create({ data: { ...validation.data, created_by: session.user.id } });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
