import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { userSchema } from "@/models/validation-schema";

export async function PATCH (req: NextRequest, { params }: { params: { id: string } }) {
  const validation = userSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const { id } = params;
  const updateData: { [key: string]: string | boolean } = {};

  if (validation.data.password) {
    validation.data.password = await bcrypt.hash(validation.data.password, 10);
  }

  for (const [field, value] of Object.entries(validation.data)) {
    updateData[field] = value;
  }

  await prisma.user.update({
    where: { id },
    data: {
      name: validation.data?.name,
      email: validation.data?.email,
      password: validation.data?.password
    }
  });
}

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error in DELETE request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({
      message: "User fetch successfully",
      data: user
    });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

