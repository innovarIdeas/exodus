import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateConstantSchema } from "@/models/validation-schema";

export const dynamic = "force-dynamic";

export async function GET (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search") || "";

    const where = {
      deleted_at: null,
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { shortcode: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [constantdata, total] = await Promise.all([
      prisma.constants.findMany({
        where,
        orderBy: { created_at: "desc" },
        skip: page * pageSize,
        take: pageSize,
      }),
      prisma.constants.count({ where }),
    ]);

    return NextResponse.json({
      data: constantdata,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
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
