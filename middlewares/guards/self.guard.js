const { sendErrorResponse } = require("../../helpers/send.response.errors");
const jwtService = require("../../service/jwt.service");


module.exports = async (req, res, next)=>{
    try{

        if(req.params.id != req.admin.id &&  !req.admin.is_creator){
            return sendErrorResponse({message: "Faqat shaxsiy malumotlarni korish mumkun"}, res, 403)
        }


        next()
    }catch(error){
        sendErrorResponse(error, res, 403)
    }
}