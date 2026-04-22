import successResponse from "../../Utlis/successRespone.utlis.js"
import UserModel from "../../DB/model/User.model.js";
import { comparePassowrd, hashPassword } from "../../Utlis/hash.utlis.js";
import { signToken, verifyTokin } from "../../Utlis/token.utlis.js";

export const signUp = async (req, res, next) => {
    const { user_name, password } = req.body

    const hasshPassword = await hashPassword({ plainText: password })

    const createUser = await UserModel.create({ user_name, password: hasshPassword })

    return successResponse({ res, statusCode: 201, message: "User Create Successfully", data: createUser })
}

export const login = async (req, res, next) => {
    const { user_name, password } = req.body;

    const user = await UserModel.findOne({ user_name });
    if (!user) {
        return next(new Error("user not Found", { cause: 404 }));
    }

    const isMatch = await comparePassowrd({ plainText: password, hashPassword: user.password });
    if (!isMatch) {
        return next(new Error("Invalid password", { cause: 400 }));
    }

    const accessToken = signToken({
        payload: { _id: user._id }, options: {
            expiresIn: "7d",
            issuer: "Sakanly",
            subject: "Authentication",
        }
    });

    const refreshToken = signToken({
        payload: { _id: user._id }, options: {
            expiresIn: "7d",
            issuer: "Sakanly",
            subject: "Authentication",
        }
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });

    return successResponse({ res, statusCode: 200, message: "Login Successfully", data: { accessToken, refreshToken } });
};

export const logout = async (req, res, next) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });

    return successResponse({
        res,
        statusCode: 200,
        message: "Logout successful",
        data: {}
    });
};

export const getMe = async (req, res, next) => {
    const { id } = req.params

    const user = await UserModel.findOne({ _id: id })
    if (!user) {
        return next(new Error("user not Found", { cause: 404 }));
    }

    return successResponse({ res, statusCode: 200, message: "Successfully", data: user })
}

export const updateProfile = async (req, res, next) => {
    const { id } = req.params
    const { user_name, bio } = req.body

    const user = await UserModel.findOneAndUpdate({ _id: id }, { $set: { user_name, bio } }, { new: true })
    if (!user) {
        return next(new Error("user not Founded", { cause: 409 }))
    }

    return successResponse({ res, statusCode: 200, message: "Profile Update Successfully", data: user })
}

