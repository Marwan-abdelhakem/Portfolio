import { Router } from "express";
import * as projectService from "./project.service.js"
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js"
import { validation } from "../../Middelwares/validation.middelwares.js"
import { projectValidation } from "./project.validation.js"

const router = Router()

router.post("/createProject", authentication, projectService.createProject)

router.get("/getAllProjects", projectService.getAllProjects)

router.patch("/updateProject/:id", authentication, projectService.updateProject)

router.delete("/deleteProject/:id", authentication, projectService.deleteProject)



export default router