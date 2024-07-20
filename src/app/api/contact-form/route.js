import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed" },
      {
        status: 405,
      }
    );
  }
  const body = await request.json();
  const { data } = body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Contact Form Submission",
    text: data,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to get admins" },
      {
        status: 500,
      }
    );
  }
}
