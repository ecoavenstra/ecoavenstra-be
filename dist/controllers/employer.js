import { transporter } from "../utils/mailTransport.js";
export const getEmployerDashboard = (req, res) => {
    res.send("Employer Dashboard");
};
export const employerEnquiry = async (req, res) => {
    try {
        //@ts-ignore
        const { name, contactNumber, designation, email, city } = req.body;
        const mailOptions = {
            from: process.env.EMAIL_FROM || "axxatagrawal@gmail.com",
            to: process.env.EMAIL_FROM || "axxatagrawal@gmail.com",
            subject: "Employer Enquiry",
            text: `
        You have received a new employer enquiry with the following details:

        Name: ${name}
        Contact Number: ${contactNumber}
        Designation: ${designation}
        Email: ${email}
        City: ${city}

        Please follow up accordingly.
      `,
        };
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: "Enquiry sent successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error?.message || "An error occurred while sending the enquiry.",
        });
    }
};
