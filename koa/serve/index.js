#!/usr/bin/env node
const express=require("express");
const app=express();
const Router=express.Router();
const bodyRarser=require("body-parser")
const fs=require("fs");
const getData=(path)=>new Promise((resolve,resject)=>{
    fs.readFile(path,(err,data)=>{
        if(err){
            resject(err); 
            return;
        }
        resolve(JSON.parse(data.toString()));
    })
})

app.use(bodyRarser.urlencoded({extended:false}));
app.use(bodyRarser.json())
Router.post("/serarch",async (req,res)=>{
    let {val} =req.body;
    let data=await getData("./data/data.json");
    res.send({
        code:1,
        mes:"success",
        data:data.data.filter(item=>{
            return item.phone.includes(val)||item.name.includes(val)||item.title.includes(val)
        })
    })
})
const Mock=require("mockjs");
const fs=require("fs");
Mock.mock({
    "data|40":[
        {
            title:"@ctitle",
            "name":"@cname",
            "phone|11":1,
            "price|100-300":1,
            "image":"@image(100x100)"
        }
    ]
})

app.listen(3000)