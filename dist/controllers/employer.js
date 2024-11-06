import { transporter } from "../utils/mailTransport.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getEmployerDashboard = (req, res) => {
    res.send("Employer Dashboard");
};
export const employerEnquiry = async (req, res) => {
    try {
        const { companyName, jobTitle, salaryRange, category, vacancy, jobType, jobLocation, jobDescription, contactNumber, openTill,
        //@ts-ignore
         } = req.body;
        // Store job details in the database
        const job = await prisma.job.create({
            data: {
                companyName,
                jobTitle,
                salaryRange,
                category,
                vacancy,
                jobType,
                jobLocation,
                jobDescription,
                contactNumber,
                openTill,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_FROM || "axxatagrawal@gmail.com",
            to: process.env.EMAIL_FROM || "axxatagrawal@gmail.com",
            subject: "New Job Enquiry",
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
              New Job Enquiry Details
            </div>
            <div class="email-body">
              <h4>Company Name:</h4>
              <span>${companyName}</span>
              <h4>Job Title:</h4>
              <span>${jobTitle}</span>
              <h4>Salary Range:</h4>
              <span>${salaryRange || "Not specified"}</span>
              <h4>Category:</h4>
              <span>${category || "Not specified"}</span>
              <h4>Vacancy:</h4>
              <span>${vacancy || "Not specified"}</span>
              <h4>Job Type:</h4>
              <span>${jobType || "Not specified"}</span>
              <h4>Job Location:</h4>
              <span>${jobLocation}</span>
              <h4>Job Description:</h4>
              <span>${jobDescription}</span>
              <h4>Contact Number:</h4>
              <span>${contactNumber || "Not specified"}</span>
              <h4>Open Till:</h4>
              <span>${openTill}</span>
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
            job,
            message: "Enquiry saved and email sent successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error?.message || "An error occurred while processing the enquiry.",
        });
    }
};
export const updateJobApprovalStatus = async (req, res) => {
    const jobId = parseInt(req.params.jobId, 10); // Convert jobId to an integer
    //@ts-ignore
    const { isApproved, } = req.body; // Expecting a boolean value for isApproved in the request body
    if (isNaN(jobId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid jobId provided. Must be a number.",
        });
    }
    try {
        // Update the isApproved field of the specified job
        const updatedJob = await prisma.job.update({
            where: { id: jobId },
            //@ts-ignore
            data: { isApproved },
        });
        res.status(200).json({
            success: true,
            message: `Job approval status updated successfully to ${isApproved}`,
            job: updatedJob,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error?.message || "An error occurred while updating the job approval status.",
        });
    }
};
