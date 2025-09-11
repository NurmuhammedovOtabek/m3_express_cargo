const { createViewPage } = require("../helpers/create.view.page")

const router = require("express").Router()

router.get("/", (req,res)=>{
    res.render(createViewPage("index"), 
    {
        title: "Assosiy sahifa", 
        isHome: true
    })
})
router.get("/admin", (req,res)=>{
    res.render(createViewPage("admin"), 
    {
        title: "Admin sahifa", 
        isAdmin: true
    })
})
router.get("/order", (req,res)=>{
    res.render(createViewPage("order"), 
    {
        title: "Order sahifa", 
        isOrder: true
    })
})

router.get("/oper", (req,res)=>{
    res.render(createViewPage("oper"), 
    {
        title: "Oper sahifa", 
        isOper: true
    })
})

router.get("/login", (req,res)=>{
    res.render(createViewPage("login"), 
    {
        title: "Login sahifa", 
        isLogin: true
    })
})

module.exports = router