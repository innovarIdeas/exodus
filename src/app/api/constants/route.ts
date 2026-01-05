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
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const where = {
      deleted_at: null,
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { shortcode: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    // Validate sortBy field
    const validSortFields = ["created_at", "updated_at", "name", "shortcode", "value"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "created_at";
    const orderDirection = sortOrder === "asc" ? "asc" : "desc";

    const [constantdata, total] = await Promise.all([
      prisma.constants.findMany({
        where,
        orderBy: { [sortField]: orderDirection },
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
      const { error } = validation as import("zod").SafeParseError<typeof updateConstantSchema>;

      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      );
    }

    const { shortcode, name, value, ...rest } = validation.data;

    if (!shortcode || typeof shortcode !== "string") {
      return NextResponse.json({ error: "Missing required field: shortcode" }, { status: 400 });
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
    }

    if (typeof value !== "number") {
      return NextResponse.json({ error: "Missing required field: value" }, { status: 400 });
    }

    // Check if a constant with the same name already exists (case-insensitive, excluding deleted)
    const existingConstant = await prisma.constants.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        deleted_at: null,
      },
    });

    if (existingConstant) {
      return NextResponse.json(
        { error: "A constant with this name already exists" },
        { status: 409 }
      );
    }

    const constant = await prisma.constants.create({
      data: {
        ...rest,
        shortcode,
        name,
        value,
      }
    });

    return NextResponse.json(constant, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
