import nodemailer from 'nodemailer';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { env } from '../../config/envConfig/envConfig';

export const emailOwner = 'alexisgraff123@gmail.com';

export const email = async (body: string, subject: string, emailReceiver: string, text: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: emailOwner,
      pass: env.PASS_NODEMAILER,
    },
  });

  const info = await transporter.sendMail({
    from: '"Alexis Graff 💻" <foo@example.com>', // sender address
    to: emailReceiver, // list of receivers
    subject: `${subject} ✔`, // Subject line
    text: text, // plain text body
    html: `${body}`, // html body
  });
  logger.info(`Message sent: %s ${info.messageId}`);
};
