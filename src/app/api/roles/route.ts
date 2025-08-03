import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { roleSchema } from "@/models/validation-schema";

export async function GET () {
  try {
    const roles = await prisma.role.findMany(
      { include: { permissions: { include: { permission: true } } } },
    );

    return NextResponse.json(roles);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  try {
    const validation = roleSchema.safeParse(await req.json());

    if (!validation.success) {
      const { error } = validation as import("zod").SafeParseError<typeof roleSchema>;

      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    const role = await prisma.role.create({
      data: {
        name: validation.data.name,
        built_in: validation.data.built_in ?? false,
        active: validation.data.active ?? true,
        permissions: { create: validation.data.permissions_ids.map((permission) => ({ permission_id: permission.id, active: true })) },
      },
    });

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" + error }, { status: 500 });
  }
}
