import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const updatedCoupon = await prisma.discount.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.error("Error in DELETE request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const coupon = await prisma.discount.findUnique({ where: { id: id } });

    if (!coupon) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({
      message: "Coupon fetch successfully",
      data: coupon
    });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

