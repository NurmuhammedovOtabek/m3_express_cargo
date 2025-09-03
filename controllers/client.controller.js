const { fn, col } = require("sequelize");
const Client = require("../models/client");
const Order = require("../models/order");
const Operation = require("../models/operation");
const Status = require("../models/status");

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

const shart3 = async (req,res)=>{
    try{
        const client = await Client.findAll({
            attributes: ["full_name", [fn(`Count`, col(`order.id`)), `quantity`]],
            include: {model: Order , as: `order`, attributes: []},
            group: [`client.id`],
            order: ["full_name", [fn(`Count`, col(`order.id`)), `DESC`]],
            limit: 5,
            subQuery: false
            
        })
        res.status(200).send({
            message: "all operations",
            data: client
        })
    }catch(error){
        console.log(error);
        res.status(500).send(
            error.message
        )
    }
}


const shart4 = async (req, res) => {
    try {
        const filtr = await Client.findAll({
            attributes: ["full_name", "phone_number"],
            include: [
              {
                model: Order,
                as: "order",
                attributes: [],
                include: [
                  {
                    model: Operation,
                    as: "operation",
                    attributes: [],
                    include: [
                      {
                        model: Status,
                        as: "status",
                        attributes: [],
                        where: { name: "Mijozga yetkazilmagan" },
                      },
                    ],
                  },
                ],
              },
            ],
          });
          
      console.log(filtr);
      
      res.send(filtr);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  };

  

module.exports = {
    addClient,
    getAllClients,
    getByIdClients,
    updateClient,
    deleteClient,
    shart3,
    shart4
}