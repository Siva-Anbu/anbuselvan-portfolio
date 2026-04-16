import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 's.anbuselvan@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — Portfolio Contact`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
          <h2 style="color: #C9A96E; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #888; font-size: 13px; margin-bottom: 32px;">From your portfolio website</p>

          <div style="background: #ffffff; border-radius: 8px; padding: 24px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 0.1em;">Name</p>
            <p style="margin: 0 0 24px; font-size: 16px; color: #222;">${name}</p>

            <p style="margin: 0 0 8px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 0.1em;">Email</p>
            <p style="margin: 0 0 24px; font-size: 16px; color: #222;">
              <a href="mailto:${email}" style="color: #C9A96E;">${email}</a>
            </p>

            <p style="margin: 0 0 8px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
            <p style="margin: 0; font-size: 15px; color: #222; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 24px;">
            Hit reply to respond directly to ${name}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
