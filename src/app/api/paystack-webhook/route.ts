import { NextRequest, NextResponse } from "next/server";
import { IWebhookEventResponse } from "@/models/models";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST (req: NextRequest) {
  try {
    const secret = process.env.PAYSTACK_TEST_SECRET_KEY;

    if(!secret) {
      return NextResponse.json({ error: "No Secret key found" }, { status: 400 });
    }

    const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(req.body))
      .digest("hex");

    if (hash == req.headers.get("x-paystack-signature")) {
      const event: IWebhookEventResponse | null = req.body as unknown as  IWebhookEventResponse;
      const id = event.data.reference;

      await prisma.transactions.update({ where: { id }, data: { status: event.data.status } });
      console.error(event);
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

