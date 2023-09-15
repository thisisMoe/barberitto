import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from '../dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: this.configService.get('SMTP_USER'),
      pass: this.configService.get('SMTP_KEY'),
    },
  });

  async notifyEmail({ email, text }: NotifyEmailDto) {
    console.log(email);
    try {
      const info = await this.transporter.sendMail({
        from: `support.${this.configService.get('SMTP_USER')}`,
        to: email,
        subject: 'Sleepr Notifciations',
        text,
      });
      console.log(`Message Sent: ${info.messageId}`);
    } catch (error) {
      console.log(error);
      throw new Error(
        `Something went wrong in the sendmail method. Error: ${error.message}`,
      );
    }
  }
}
