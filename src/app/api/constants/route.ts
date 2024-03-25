import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateConstantSchema } from "@/models/validation-schema";

export const dynamic = "force-dynamic";

export async function GET () {
  try {
    const constantdata = await prisma.constants.findMany({
      where: { deleted_at: null },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(constantdata);
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
    const validation = updateConstantSchema.safeParse(await req.json());

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues },
        { status: 400 }
      );
    }

    const constant = await prisma.constants.create({ data: validation.data });

    return NextResponse.json(constant, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
