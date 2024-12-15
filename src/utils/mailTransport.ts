import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM || 'ecoavenstrainfo@gmail.com',
    pass: process.env.EMAIL_AUTH_PASSWORD || 'jxsl dvou gkvm wuga', // or App Password if 2FA is enabled
  },
});