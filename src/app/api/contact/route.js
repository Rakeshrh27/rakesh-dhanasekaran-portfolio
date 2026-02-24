import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Incomplete data. Extraction failed.', status: 'error' },
        { status: 400 }
      );
    }

    // Send email to your inbox
    const { data: emailData, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'rdhanasekaran27@gmail.com', // Fallback or env
      reply_to: email,
      subject: `[Portfolio Contact] ${subject || 'New Message'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0; padding:0; background-color:#f5f7fa; font-family: Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa; padding:20px 0;">
              <tr>
                <td align="center">
                  
                  <!-- Container -->
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background:#111827; padding:24px; text-align:center;">
                        <h2 style="margin:0; color:#ffffff; font-size:20px; font-weight:600;">
                          📩 New Contact Message
                        </h2>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:30px; color:#333333;">
                        
                        <p style="margin:0 0 10px 0; font-size:14px;">
                          <strong>From:</strong> ${name}
                        </p>

                        <p style="margin:0 0 10px 0; font-size:14px;">
                          <strong>Email:</strong> 
                          <a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">
                            ${email}
                          </a>
                        </p>

                        <p style="margin:0 0 20px 0; font-size:14px;">
                          <strong>Subject:</strong> ${subject || 'No Subject'}
                        </p>

                        <!-- Message Box -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="background:#f3f4f6; padding:20px; border-radius:6px; font-size:14px; line-height:1.6; white-space:pre-wrap;">
                              ${message}
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:20px 30px; font-size:12px; color:#6b7280; background:#fafafa; border-top:1px solid #eeeeee;">
                        This message was sent from your portfolio contact form.
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      throw new Error(error.message);
    }

    return NextResponse.json(
      { message: 'Secure transmission received. Intelligence analyzed.', status: 'success' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { message: 'Transmission failure. System compromised. ' + error.message, status: 'error' },
      { status: 500 }
    );
  }
}
