const currency = require('../models/currency_type')

const createCurrency_t = async (req,res)=>{
    try{
    const {name, description} = req.body
    const newCurrency_t = await currency.create({name, description})
    res.status(201).json({
        message: "Created succsessfily",
        data: newCurrency_t
    })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const getCurrency = async (req,res)=>{
    try{
        const get = await currency.findAll()
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

const getByIdCurrency = async (req,res)=>{
    try{
        const {id} = req.params
        const dataC = await currency.findByPk(id)
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

const updateCurrency = async (req,res)=>{
    try{
        const {id} = req.params
        const updateC = await currency.update(req.body, {where: {id}, returning: true})
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

const deleteCurrency = async (req,res)=>{
    try{
        const {id} = req.params
        await currency.destroy({where: {id}})
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
    createCurrency_t,
    getCurrency,
    getByIdCurrency,
    updateCurrency,
    deleteCurrency
}