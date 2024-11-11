import { Request, Response } from "express";
import { transporter } from "../utils/mailTransport.js";
import { PrismaClient } from "@prisma/client";
import uploadOnCloudinary from "../utils/cloudinary.js";
const prisma = new PrismaClient();

export const getEmployerDashboard = (req: Request, res: Response) => {
  res.send("Employer Dashboard");
};

export const employerEnquiry = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      companyType,
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
      //@ts-ignore
    } = req.body;

    // Store job details in the database
    const job = await prisma.job.create({
      data: {
        //@ts-ignore
        name,
        email,
        companyType,
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        error?.message || "An error occurred while processing the enquiry.",
    });
  }
};

export const updateJobApprovalStatus = async (req: Request, res: Response) => {
  const jobId = parseInt(req.params.jobId, 10); // Convert jobId to an integer
  //@ts-ignore
  const { isApproved } = req.body; // Expecting a boolean value for isApproved in the request body

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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "An error occurred while updating the job approval status.",
    });
  }
};


export const ApplyJobs =async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { name, email, phoneNumber, skills, experience, jobId } = req.body;

    let resumeLocalPath;
    if (
      //@ts-ignore
      req.files &&
      //@ts-ignore
      Array.isArray(req.files.resume) &&
      //@ts-ignore
      req.files.resume.length > 0
    ) {
      //@ts-ignore
      resumeLocalPath = req.files.resume[0].path;
    }

    const resume = await uploadOnCloudinary(resumeLocalPath);

    // Save job application details to the database
    // const application = await prisma.jobApplication.create({
    //   data: {
    //     name,
    //     email,
    //     phoneNumber,
    //     skills,
    //     experience,
    //     resumeUrl: resume?.secure_url || "",
    //   },
    // });

    // Configure email transport
   

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || "axxatagrawal@gmail.com",
      to: process.env.EMAIL_FROM || "axxatagrawal@gmail.com",
      subject: "New Job Application",
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
            <div class="email-header">New Job Application Details</div>
            <div class="email-body">
              <h4>Name:</h4> <span>${name}</span>
              <h4>Email:</h4> <span>${email}</span>
              <h4>Phone Number:</h4> <span>${phoneNumber}</span>
              <h4>Skills:</h4> <span>${skills}</span>
              <h4>Experience:</h4> <span>${experience || "Not specified"}</span>
              <h4>Resume URL:</h4> <span>${resume?.secure_url || "Not available"}</span>
              <h4>Resume URL:</h4> <span>${jobId}</span>
            </div>
            <div class="email-footer">Please follow up accordingly.</div>
          </div>
        </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Job application submitted successfully",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}