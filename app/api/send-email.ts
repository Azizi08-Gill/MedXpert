import type { NextApiRequest, NextApiResponse } from 'next';
import formData from 'form-data';
import Mailgun from 'mailgun.js';


interface EmailRequestBody {
  to: string;
  subject: string;
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const mailgun = new Mailgun(formData);
    const client = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY as string, 
    });

    const { to, subject, text } = req.body as EmailRequestBody;

    try {
      const response = await client.messages.create(process.env.MAILGUN_DOMAIN as string, {
        from: 'Your Name <your-email@domain.com>',
        to,
        subject,
        text,
      });
      res.status(200).json({ message: 'Email sent successfully', response });
    } catch (error: any) {
      res.status(500).json({ message: 'Email sending failed', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
