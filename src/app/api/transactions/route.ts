import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { transactionSchema } from "@/models/validation-schema";

export async function GET () {
  try {
    const transactions = await prisma.transactions.findMany({ include: { order: true, created_by_user: true } });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  const session = await getServerSession(options);

  try {
    const validation = transactionSchema.safeParse(await req.json());

    if (!validation.success) {
      const { error } = validation as import("zod").SafeParseError<typeof transactionSchema>;

      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { order_id, status, type, ...rest } = validation.data;

    if (!order_id || typeof order_id !== "string") {
      return NextResponse.json({ error: "Missing required field: order_id" }, { status: 400 });
    }

    if (!status || typeof status !== "string") {
      return NextResponse.json({ error: "Missing required field: status" }, { status: 400 });
    }

    if (!type || typeof type !== "string") {
      return NextResponse.json({ error: "Missing required field: type" }, { status: 400 });
    }

    const user_id = session?.user.id;

    if (!user_id || typeof user_id !== "string") {
      return NextResponse.json({ error: "Missing required user_id from session" }, { status: 400 });
    }

    const order = await prisma.transactions.create({
      data: {
        ...rest,
        order: { connect: { id: order_id } },
        created_by_user: { connect: { id: user_id } },
        status,
        type,
      }
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
