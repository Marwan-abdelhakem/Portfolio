import successResponse from "../../Utlis/successRespone.utlis.js"
import ProjectModel from "../../DB/model/project.model.js"

export const createProject = async (req, res, next) => {
    const { title, description, technologies, liveLink, githubLink } = req.body

    const project = await ProjectModel.create({ title, description, technologies, liveLink, githubLink })

    return successResponse({ res, statusCode: 201, message: "Project Create Successfully", data: project })
}

export const getAllProjects = async (req, res, next) => {
    const projects = await ProjectModel.find()

    return successResponse({ res, statusCode: 201, message: "Successfully", data: projects })
}

export const updateProject = async (req, res, next) => {
    const { id } = req.params
    const { title, description, technologies, liveLink, githubLink } = req.body

    const project = await ProjectModel.findOneAndUpdate({ _id: id }, { $set: { title, description, technologies, liveLink, githubLink } }, { new: true })
    if (!project) {
        return next(new Error("project not founded", { cause: 404 }));
    }

    return successResponse({ res, statusCode: 201, message: "Successfully", data: project })
}

export const deleteProject = async (req, res, next) => {
    const { id } = req.params

    const project = await ProjectModel.findOneAndDelete({ _id: id })
    if (!project) {
        return next(new Error("project not Found", { cause: 404 }));
    }

    return successResponse({ res, statusCode: 201, message: "project delete Successfully", data: project })
}

