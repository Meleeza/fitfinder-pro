import nodemailer from 'nodemailer';
import { config } from './env.js';

export const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });
};

export const emailConfig = {
  from: {
    name: config.email.fromName,
    address: config.email.fromAddress,
  },
};
