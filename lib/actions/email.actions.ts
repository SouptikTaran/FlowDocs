'use server';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

export async function sendInviteEmail({
  to,
  documentName,
  inviter,
  documentUrl,
}: {
  to: string;
  documentName: string;
  inviter: string;
  documentUrl: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.NODE_MAILER_USER,
      to,
      subject: `You've been invited to collaborate on "${documentName}"`,
      html: `<p>${inviter} has invited you to collaborate on <strong>"${documentName}"</strong>.</p>
            <p>Click <a href="${documentUrl}">here</a> to open the document.</p>`
    });
    console.log('Invite email sent successfully.');
  } catch (error) {
    console.error('Failed to send invite email via Nodemailer:', error);
  }
}
