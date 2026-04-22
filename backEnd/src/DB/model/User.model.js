import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema(
    {
        user_name: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [20, "Name must be at most 20 characters long"],
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.models.users || mongoose.model("users", UserSchema)

export default UserModel