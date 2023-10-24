import { Router } from "express"
import usersController from "../controllers/users.controller.js"
import auth from "../middlewares/auth.middlewares.js"
import { uploader } from "../utils/multer.js"
import authorized from "../middlewares/premium.middleware.js"
import userModel from "../models/schemas/Users.model.js"

const uploaderDocuments = [
    // uploader.fields([
    //     { name: 'file1'},
    //     { name: 'file2'},
    // ])
    uploader.any()
]

uploader.any


class UsersRouter{
    constructor(){
        this.InicioUser = Router()

        this.InicioUser.get("/profile", auth(["BASIC", "PREMIUM", "ADMIN"]), usersController.profile)
        this.InicioUser.get("/premium", auth(["BASIC", "PREMIUM"]), authorized(), usersController.changeRole)
        this.InicioUser.post("/documents", auth(["BASIC", "PREMIUM", "ADMIN"]), uploaderDocuments, usersController.uploadDocuments)
        this.InicioUser.get('/', async (req, res) => {
            res.send(req.user)
        })
    }

    getRouter(){
        return this.InicioUser
    }
}

export default new UsersRouter()