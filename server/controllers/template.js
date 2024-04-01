import jwt from "jsonwebtoken";
import Template from "../models/template.js";

export const createTemplate = async (req, res) => {
  try {
    const { token, role, questions } = req.body;
    console.log(token, role, questions);
    // Check if all required fields are provided
    if (!token || !role || !questions || !Array.isArray(questions)) {
      return res
        .status(400)
        .json({ message: "Token, role, and questions array are required." });
    }
    const recruiterId = jwt.verify(token, process.env.JWT_SECRET).id;
    // Create the template
    const newTemplate = await Template.create({
      recruiterId,
      role,
      questions,
    });

    return res.status(201).json({
      status: 201,
      message: `Template created successfully`,
      template: newTemplate,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    return res.status(500).json({
      status: 500,
      message: `Template not created. Please Try again.`,
    });
  }
};
export const updateTemplateQuestions = async (req, res) => {
  try {
    const { recruiterId, role } = req.body; // Assuming you're passing recruiterId and role in the request body
    const { questions } = req.body;

    // Check if recruiterId and role are provided
    if (!recruiterId || !role) {
      return res
        .status(400)
        .json({ message: "Recruiter ID and role are required." });
    }

    // Find the template based on recruiterId and role
    const template = await Template.findOne({ recruiterId, role });

    if (!template) {
      return res.status(404).json({ message: "Template not found." });
    }

    // Update questions in the template
    template.questions = questions;
    const updatedTemplate = await template.save();

    return res
      .status(200)
      .json({
        message: "Template questions updated successfully",
        template: updatedTemplate,
      });
  } catch (error) {
    console.error("Error updating template questions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTemplates = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res
            .status(400)
            .json({ message: "Token is required" });
    }

    const recruiterId = jwt.verify(token, process.env.JWT_SECRET).id;
    const reqTemplates = await Template.find({ recruiterId });

    return res
        .status(200)
        .json({ templates: reqTemplates });
};

export const getRoleTemplates = async(req, res) => {
    const {token, role} = req.body;

    if (!token || !role) {
        return res
            .status(400)
            .json({ message: "Token and role both are required" });
    }

    const recruiterId = jwt.verify(token, process.env.JWT_SECRET).id;
    const roleTemplate = await Template.findOne({ recruiterId, role });
    return res
        .status(200)
        .json({ roleTemplate , recruiterId});
}
