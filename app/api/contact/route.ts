import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "aymene16boudjelida@gmail.com";
// Resend's shared sender works without a verified domain and can deliver to the
// account owner's address. Swap for an address on your own verified domain
// (e.g. "Portfolio <hello@spinpah.com>") once configured in Resend.
const FROM_EMAIL = "Portfolio <onboarding@resend.dev>";

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !emailRegex.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: "Please fill in all fields correctly." },
      { status: 422 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2 style="margin:0 0 12px;">New project inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${escapeHtml(
            message
          )}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Could not send message. Please email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not send message. Please email me directly." },
      { status: 502 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
