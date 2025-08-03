import { NextRequest, NextResponse } from "next/server";
import { CLAIM_TYPE } from "@/models/constant";
import { ROLE_CLIENT } from "@/lib/rbac";
import bcrypt from "bcryptjs";
import { firstLoginSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const tempBook = await prisma.temp_Book.findUnique({ where: { id } });

    if (!tempBook) {
      return NextResponse.json({ message: "Temp_Book not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Temp_Book fetched successfully",
      data: tempBook,
    });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  try {
    const validation = firstLoginSchema.safeParse(await req.json());

    if (!validation.success) {
      const { error } = validation as import("zod").SafeParseError<typeof firstLoginSchema>;

      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    let existingUser;

    existingUser = await prisma.user.findUnique({ where: { email: validation.data.email } });
    const role = await prisma.role.findUnique({ where: { name: ROLE_CLIENT } });
    const hashedPassword = await bcrypt.hash(validation.data.email, 10);

    if(!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          name: validation.data.name,
          email: validation.data.email,
          password: hashedPassword,
          claims: { create: { role_id: role?.id, type: CLAIM_TYPE.ROLE } },
        }
      });
    }

    if(!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const book = await prisma.book.create({ data: { title: validation.data.title, created_by: existingUser.id, author: validation.data.author, status: validation.data.status } });

    return NextResponse.json({ existingUser, book });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

