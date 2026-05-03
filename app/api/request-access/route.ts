import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, useCase } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and Email are required.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'support@convosatya.com',
        pass: process.env.ZOHO_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'support@convosatya.com',
      to: 'support@convosatya.com',
      subject: 'New Early Access Request',
      text: `Name: ${name}\nEmail: ${email}\nUse Case: ${useCase || 'N/A'}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send request. Please try again later.' },
      { status: 500 }
    );
  }
}
