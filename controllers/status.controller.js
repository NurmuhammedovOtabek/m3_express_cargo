const status = require('../models/status')

const createStatus = async (req,res)=>{
    try{
    const {name, description} = req.body
    const newStatus = await status.create({name, description})
    res.status(201).json({
        message: "Created succsessfily",
        data: newStatus
    })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const getStatus = async (req,res)=>{
    try{
        const get = await status.findAll()
        res.status(200).json({
            message: "Getting ",
            data: get
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const getByIdStatus = async (req,res)=>{
    try{
        const {id} = req.params
        const dataC = await status.findByPk(id)
        res.status(200).json({
            message: "Succsess",
            data: dataC
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const updateStatus = async (req,res)=>{
    try{
        const {id} = req.params
        const updateC = await status.update(req.body, {where: {id}, returning: true})
        res.status(200).json({
            message: "succsess",
            data: updateC[1][0]
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }

}

const deleteStatus = async (req,res)=>{
    try{
        const {id} = req.params
        await status.destroy({where: {id}})
        res.status(201).send({
            message: "Deleted",
            data: id
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createStatus,
    getStatus,
    getByIdStatus,
    updateStatus,
    deleteStatus
}