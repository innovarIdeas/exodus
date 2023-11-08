import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {  updateTempBookSchema } from "@/models/validation-schema";

export async function PATCH (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const validation = updateTempBookSchema.safeParse(await req.json());

  if(!validation.success) {
    return NextResponse.json({ error: validation.error.issues }, { status: 400 });
  }

  try {
    const tempBook = await prisma.temp_Book.update({ where: { id }, data: validation.data });

    return NextResponse.json(tempBook);
  } catch (error) {
    console.error("Error in PATCH request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const updatedTempBook = await prisma.temp_Book.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json(updatedTempBook);
  } catch (error) {
    console.error("Error in DELETE request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await prisma.temp_Book.findUnique({ where: { id: id } });

    if (!user) return NextResponse.json({ message: "Temp book not found" }, { status: 404 });

    return NextResponse.json({
      message: "Temp book fetch successfully",
      data: user
    });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
