import { PrismaClient } from "@prisma/client";
import uploadOnCloudinary from "../utils/cloudinary.js";
const prisma = new PrismaClient();
export const getAdminDashboard = async (req, res) => {
    try {
        const totalJobs = await prisma.job.count();
        const totalService = await prisma.service.count();
        const totalEnquiry = await prisma.enquiry.count();
        const pendingEnquiriesList = await prisma.enquiry.findMany({
            where: {
                status: 'pending',
            },
        });
        const pendingEnquiries = pendingEnquiriesList.length;
        return res.status(200).json({
            success: true,
            totalJobs,
            totalService,
            totalEnquiry,
            pendingEnquiries,
            pendingEnquiriesList
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const postArticle = async (req, res) => {
    try {
        const { title, user, category, seoTitle, seoKeyword, shortDescription, description,
        //@ts-ignore
         } = req.body;
        let coverImageLocalPath;
        if (
        //@ts-ignore
        req.files &&
            //@ts-ignore
            Array.isArray(req.files.coverImage) &&
            //@ts-ignore
            req.files.coverImage.length > 0) {
            //@ts-ignore
            coverImageLocalPath = req.files.coverImage[0].path;
        }
        console.log(coverImageLocalPath);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);
        const article = await prisma.article.create({
            data: {
                title,
                user,
                category,
                seoTitle,
                seoKeyword,
                shortDescription,
                description,
                coverImage: coverImage?.secure_url || "",
            },
        });
        return res
            .status(200)
            .json({ success: true, message: "Article Created", article });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read all articles
export const getArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany();
        return res.status(200).json({ success: true, articles });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read a single article by ID
export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await prisma.article.findUnique({
            where: { id: Number(id) },
        });
        if (article) {
            return res.status(200).json({ success: true, article });
        }
        return res
            .status(404)
            .json({ success: false, message: "Article not found" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Update an article by ID
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    //@ts-ignore
    const { title, user, category, seoTitle, seoKeyword, shortDescription, description,
    //@ts-ignore
     } = req.body;
    try {
        const article = await prisma.article.update({
            where: { id: Number(id) },
            data: {
                title,
                user,
                category,
                seoTitle,
                seoKeyword,
                shortDescription,
                description,
            },
        });
        return res
            .status(200)
            .json({ success: true, message: "Article Updated", article });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Delete an article by ID
export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.article.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ success: true, message: "Article Deleted" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Search articles by title
export const searchArticlesByTitle = async (req, res) => {
    //@ts-ignore
    const { title } = req.body;
    try {
        const articles = await prisma.article.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive",
                },
            },
        });
        return res.status(200).json({ success: true, articles });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const postService = async (req, res) => {
    try {
        //@ts-ignore
        const { title, type, shortDescription, description } = req.body;
        const service = await prisma.service.create({
            data: {
                title,
                type,
                shortDescription,
                description,
            },
        });
        return res
            .status(200)
            .json({ success: true, message: "Article Created", service });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read all services
export const getServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        return res.status(200).json({ success: true, services });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read a single service by ID
export const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await prisma.service.findUnique({
            where: { id: Number(id) },
        });
        if (service) {
            return res.status(200).json({ success: true, service });
        }
        return res
            .status(404)
            .json({ success: false, message: "Service not found" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Update a service by ID
export const updateService = async (req, res) => {
    const { id } = req.params;
    //@ts-ignore
    const { title, type, shortDescription, description } = req.body;
    try {
        const service = await prisma.service.update({
            where: { id: Number(id) },
            data: {
                title,
                type,
                shortDescription,
                description,
            },
        });
        return res
            .status(200)
            .json({ success: true, message: "Service Updated", service });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Delete a service by ID
export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.service.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ success: true, message: "Service Deleted" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Search services by title
export const searchServicesByTitle = async (req, res) => {
    const { title } = req.query;
    try {
        const services = await prisma.service.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive",
                },
            },
        });
        return res.status(200).json({ success: true, services });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const postJobs = async (req, res) => {
    try {
        const { name, email, companyType, companyName, jobTitle, salaryRange, category, vacancy, jobType, jobLocation, jobDescription, contactNumber, openTill,
        //@ts-ignore
         } = req.body;
        const jobs = await prisma.job.create({
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
                //@ts-ignore
                isApproved: true, // Set isApproved to true
            },
        });
        return res.status(200).json({ success: true, message: "Job Created", jobs });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await prisma.job.findMany();
        return res.status(200).json({ success: true, jobs });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read a single job by ID
export const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await prisma.job.findUnique({
            where: { id: Number(id) },
        });
        if (job) {
            return res.status(200).json({ success: true, job });
        }
        return res.status(404).json({ success: false, message: "Job not found" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Update a job by ID
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { name, email, companyType, companyName, jobTitle, salaryRange, category, vacancy, jobType, jobLocation, jobDescription, contactNumber, openTill, isApproved
    //@ts-ignore
     } = req.body;
    try {
        const job = await prisma.job.update({
            where: { id: Number(id) },
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
                //@ts-ignore
                isApproved
            },
        });
        return res.status(200).json({ success: true, message: "Job Updated", job });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Delete a job by ID
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.job.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ success: true, message: "Job Deleted" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Search jobs by title
export const searchJobsByTitle = async (req, res) => {
    const { jobTitle } = req.query;
    try {
        const jobs = await prisma.job.findMany({
            where: {
                jobTitle: {
                    contains: jobTitle,
                    mode: "insensitive",
                },
            },
        });
        return res.status(200).json({ success: true, jobs });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
//Blogs
export const postBlog = async (req, res) => {
    try {
        //@ts-ignore
        const { title, content, bannerImage } = req.body;
        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                bannerImage,
            },
        });
        return res
            .status(200)
            .json({ success: true, message: "Blog Created", blog });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read all blog posts
export const getBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany();
        return res.status(200).json({ success: true, blogs });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read a single blog post by ID
export const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await prisma.blog.findUnique({
            where: { id: Number(id) },
        });
        if (blog) {
            return res.status(200).json({ success: true, blog });
        }
        return res.status(404).json({ success: false, message: "Blog not found" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Update a blog post by ID
export const updateBlog = async (req, res) => {
    const { id } = req.params;
    //@ts-ignore
    const { title, content, bannerImage } = req.body;
    try {
        const blog = await prisma.blog.update({
            where: { id: Number(id) },
            data: {
                title,
                content,
                bannerImage,
            },
        });
        return res
            .status(200)
            .json({ success: true, message: "Blog Updated", blog });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Delete a blog post by ID
export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.blog.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ success: true, message: "Blog Deleted" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const postEnquiry = async (req, res) => {
    //@ts-ignore
    const { name, email, subject, category, organization, contactNumber, status, message } = req.body;
    if (!name || !status || !message) {
        return res.status(400).json({ error: 'Name, status, and message are required fields' });
    }
    try {
        //@ts-ignore
        const newEnquiry = await prisma.enquiry.create({
            data: {
                name,
                email,
                subject,
                category,
                contactNumber,
                status,
                message,
                organization
            },
        });
        res.status(201).json(newEnquiry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create the enquiry' });
    }
};
export const getEnquiries = async (req, res) => {
    try {
        //@ts-ignore
        const enquiries = await prisma.enquiry.findMany();
        res.json(enquiries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
};
// GET enquiry by ID
export const getEnquiryById = async (req, res) => {
    const { id } = req.params;
    try {
        //@ts-ignore
        const enquiry = await prisma.enquiry.findUnique({
            where: { id: Number(id) }
        });
        if (enquiry) {
            res.json(enquiry);
        }
        else {
            res.status(404).json({ error: 'Enquiry not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch the enquiry' });
    }
};
// DELETE enquiry by ID
export const deleteEnquiry = async (req, res) => {
    const { id } = req.params;
    try {
        //@ts-ignore
        await prisma.enquiry.delete({
            where: { id: Number(id) }
        });
        res.json({ message: 'Enquiry deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete the enquiry' });
    }
};
// UPDATE enquiry by ID
export const updateEnquiryById = async (req, res) => {
    const { id } = req.params;
    //@ts-ignore
    const { name, email, subject, category, contactNumber, status, message } = req.body;
    try {
        //@ts-ignore
        const enquiry = await prisma.enquiry.update({
            where: { id: Number(id) },
            data: { name, email, subject, category, contactNumber, status, message }
        });
        res.json(enquiry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update the enquiry' });
    }
};
// UPDATE enquiry status to pending, cancel, or resolve
export const updateEnquiryStatus = async (req, res) => {
    const { id } = req.params;
    //@ts-ignore
    const { status } = req.body;
    if (!['pending', 'resolve'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }
    try {
        //@ts-ignore
        const enquiry = await prisma.enquiry.update({
            where: { id: Number(id) },
            data: { status }
        });
        res.json(enquiry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update the status' });
    }
};
