const { Op } = require("sequelize");
const Operation = require("../models/operation");
const Status = require("../models/status");

const addOperation = async (req, res)=>{
    try{
        const {operation_date, description, adminId, orderId, statusId} =  req.body

        const newOperation = await Operation.create({
            operation_date, description, adminId, orderId, statusId
        })
        res.status(201).send({
            message: "Added",
            data: newOperation
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

const getAllOperations = async (req, res)=>{
    try{
        const operation = await Operation.findAll()
        res.status(200).send({
            message: "all operations",
            data: operation
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

const getByIdOperations = async (req, res)=>{
    try{
        const {id} = req.params

        const operation = await Operation.findByPk(id)
        res.status(200).send({
            message: "all operations",
            data: operation
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

const updateOperation = async (req, res)=>{
    try{
        const {id} = req.params
        const updateoperation = await Operation.update(req.body, {where: {id}, returning: true})
        console.log( updateOperation);
        
        res.status(201).send({
            message: "Updated",
            data: updateoperation[1][0]
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

const deleteOperation = async (req, res)=>{
    try{
        const {id} = req.params
        await Operation.destroy({where: {id}})
        
        res.status(201).send({
            message: "Deleted",
            data: id
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

const shart2 = async(req,res)=>{
    try{
        const {startDate, endDate} = req.body
        const operation = await Operation.findAll({
            include:{
                model: Status , where: {name: "Mijozga yetkazildi"}
            },
            where: {createdAt:{
                [Op.between]: [new Date(startDate), new Date(endDate)]
            }}
        })
        res.status(200).send({
            message: "bajarildi",
            data: operation
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

module.exports = {
    addOperation,
    getAllOperations,
    getByIdOperations,
    updateOperation,
    deleteOperation,
    shart2
}