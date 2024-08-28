import { Request, Response } from "express";
import { transporter } from "../utils/mailTransport.js";

export const getEmployerDashboard = (req: Request, res: Response) => {
    res.send("Employer Dashboard");
}

export const employerEnquiry = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { name, contactNumber, companyOrConsultant, companyName, numberOfEmployees, designation, email, city } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_FROM || "axxatagrawal@gmail.com",
      to: process.env.EMAIL_FROM || "axxatagrawal@gmail.com",
      subject: "Employer Enquiry",
      html: `
        <html>
        <head>
          <style>
            .email-container {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.5;
            }
            .email-header {
              background-color: #007bff;
              color: #ffffff;
              padding: 10px;
              text-align: center;
              font-size: 20px;
            }
            .email-body {
              padding: 20px;
            }
            .email-body h4 {
              margin-bottom: 5px;
            }
            .email-footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              Employer Enquiry Details
            </div>
            <div class="email-body">
              <h4>Name:</h4>
              <span>${name}</span>
              <h4>Contact Number:</h4>
              <span>${contactNumber}</span>
              <h4>Type:</h4>
              <span>${companyOrConsultant}</span>
              <h4>Company/Consultancy Name:</h4>
              <span>${companyName}</span>
              <h4>No. of Employees:</h4>
              <span>${numberOfEmployees}</span>
              <h4>Designation:</h4>
              <span>${designation}</span>
              <h4>Email:</h4>
              <span>${email}</span>
              <h4>City:</h4>
              <span>${city}</span>
            </div>
            <div class="email-footer">
              Please follow up accordingly.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Enquiry sent successfully",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error?.message || "An error occurred while sending the enquiry.",
    });
  }
};
