

const { sendErrorResponse } = require("../../helpers/send.response.errors");
const jwtService = require("../../service/jwt.service");


module.exports = (requiredRoles)=>{
    return async (req, res, next)=>{
        try{
            const {role} = req.admin
    
            if(requiredRoles != role){
                sendErrorResponse({message: "krish mumkun emas"}, res, 400)
            }
    
            
            next()
        }catch(error){
            sendErrorResponse(error, res, 403)
        }
    }
}
