import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, message, formType } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background: linear-gradient(135deg, #7FFF00 0%, #55d500 100%);
              color: #000;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #fff;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: bold;
              color: #555;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              color: #333;
              padding: 10px;
              background-color: #f5f5f5;
              border-left: 3px solid #7FFF00;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #777;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🏠 New Quote Request</h1>
              <p style="margin: 5px 0 0 0;">Long Island Construction Plus+</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Phone:</span>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="value">${message}</div>
              </div>
              ${formType ? `
              <div class="field">
                <span class="label">Form Type:</span>
                <div class="value">${formType}</div>
              </div>
              ` : ''}
              <div class="footer">
                <p>This quote request was submitted from your website.</p>
                <p>Please respond to the customer as soon as possible.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Long Island Roofing <noreply@longislandconstructionpluscompany.com>',
      to: ['liconstructionplus@gmail.com', 'info@longislandconstructionpluscompany.com', 'dalila@latinbranding.com'],
      subject: `New Quote Request from ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
