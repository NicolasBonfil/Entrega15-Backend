import userModel from "../models/schemas/Users.model.js"
import { HTTP_STATUS, successResponse } from "../utils/responses.js"
import { generateToken } from "../utils/token.js"

class UsersController{
    async profile(req, res, next){
        const user = req.user 
        res.render("current", {user})
    }

    async changeRole(req, res, next){

        if(req.user.role === "BASIC"){
            req.user.role = "PREMIUM"
        }else{
            req.user.role = "BASIC"
        }

        const access_token = generateToken(req.user)
        res.cookie("CoderCookie", access_token, {
            maxAge: 60*60*1000,
            httpOnly: true
        })

        res.send(`Se ha en convertido en un usuario: ${req.user.role}`)
    }

    async uploadDocuments(req, res, next){
        if(!req.files){
            return res.status(400).send({status: "error", error: "No se guardo la imagen"})
        }

        req.files.forEach(file => {
            req.user.documents.push({name: file.fieldname, reference: file.path})
        });
        
        console.log(req.user);
        await userModel.updateOne({_id: req.user._id}, req.user)

        const access_token = generateToken(req.user)
        res.cookie("CoderCookie", access_token, {
            maxAge: 60*60*1000,
            httpOnly: true
        })

        const response = successResponse(req.user)
        res.status(HTTP_STATUS.OK).send(response)
    }
}

export default new UsersController()