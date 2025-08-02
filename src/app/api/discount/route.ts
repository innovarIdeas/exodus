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
      const { error } = validation as import("zod").SafeParseError<typeof discountSchema>;

      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, percentage, book_id, ...rest } = validation.data;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
    }

    if (typeof percentage !== "number") {
      return NextResponse.json({ error: "Missing required field: percentage" }, { status: 400 });
    }

    if (!book_id || typeof book_id !== "string") {
      return NextResponse.json({ error: "Missing required field: book_id" }, { status: 400 });
    }

    const user = await prisma.discount.create({
      data: {
        ...rest,
        name,
        percentage,
        book: { connect: { id: book_id } },
        created_by_user: { connect: { id: session.user.id } },
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
