const Client = require("../models/client");

const addClient = async (req, res)=>{
    try{
        const {full_name, phone_number, email, address, location} =  req.body
        const candidate = await Client.findOne({where: {email}})
        if(candidate){
            return res.status(403).send({message: "Bunday mijoz mavjud"})
        }
        const newClient = await Client.create({
            full_name, phone_number, email, address, location
        })
        res.status(201).send({
            message: "Added",
            data: newClient
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

const getAllClients = async (req, res)=>{
    try{
        const client = await Client.findAll()
        res.status(200).send({
            message: "all clients",
            data: client
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

const getByIdClients = async (req, res)=>{
    try{
        const {id} = req.params

        const client = await Client.findByPk(id)
        res.status(200).send({
            message: "all clients",
            data: client
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

const updateClient = async (req, res)=>{
    try{
        const {id} = req.params
        const updateclient = await Client.update(req.body, {where: {id}, returning: true})
        console.log( updateClient);
        
        res.status(201).send({
            message: "Updated",
            data: updateclient[1][0]
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}

const deleteClient = async (req, res)=>{
    try{
        const {id} = req.params
        await Client.destroy({where: {id}})
        
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

module.exports = {
    addClient,
    getAllClients,
    getByIdClients,
    updateClient,
    deleteClient
}