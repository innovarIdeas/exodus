import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@emails";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY ?? "res_123");

export async function POST (request: NextRequest) {
  try {
    const { email, userFirstname } = await request.json();

    const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you",
      html: render(WelcomeEmail({ userFirstname })),
    });

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to send email",
          error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Email sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}
