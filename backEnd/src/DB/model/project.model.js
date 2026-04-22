import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [3, "Title must be at least 5 characters long"]
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        technologies: [String],
        liveLink: String,
        githubLink: String,
    },
    {
        timestamps: true
    }
);

const ProjectModel = mongoose.models.projects || mongoose.model("projects", ProjectSchema);

export default ProjectModel;