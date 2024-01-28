import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET () {
  try {
    const permissions = await prisma.permission.findMany();

    return NextResponse.json(permissions);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
