import { NextResponse } from "next/server";
import { ROLE_PUBLISHER } from "@/lib/rbac";
import prisma from "@/lib/prisma";

export async function GET () {
  try {
    const staff = await prisma.user.findMany({
      where: {
        claims: { some: { role: { name: ROLE_PUBLISHER } } },
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
