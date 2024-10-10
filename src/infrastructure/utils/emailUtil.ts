import nodemailer from 'nodemailer';
import { config } from '../../config/config';

export const sendEmail = async (to: string, subject: string, text: string) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    // host: config.MAIL_HOST,
    // port: config.MAIL_PORT,
    service: config.MAIL_HOST,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
    }
  });
  
  // Define the email options
  const mailOptions = {
    from: config.MAIL_FROM,
    to,
    subject,
    text,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
  }
};