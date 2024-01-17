import express from "express"
import {database} from "./database.js";

import cookieParser from "cookie-parser"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()



const port = 3001


app.use(cookieParser())
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}))
app.get("/home", (req, res)=>{

    res.sendFile(__dirname+"/public/home.html")
})

app.get("/", (req, res)=>{
    res.redirect(301, "/home")
})

app.get("/login", (req, res)=>{
    res.sendFile(__dirname+"/public/login.html")
})

app.post("/api/login", (req, res) => {
    const name = req.body.username;
    const password = req.body.password;
    if(database.users.find((user)=>user.name===name && user.password===password)){
        const newToken = `${name}_${Date.now()}`
        res.cookie('token', newToken, { maxAge: 12000, httpOnly: false});
        res.send(newToken)
    }
    else{
        res.sendStatus(401)
    }

})

app.get("/dashboard", (req, res)=>{
    const isLogged = req.cookies.token
    console.log(isLogged)
    if(isLogged){
        res.send("welcome to the dashboard")
    }
    else{
        res.redirect(301, "/")
    }
})

app.get("/api/:username/city", (req, res)=>{
    console.log(req.params.username)
    const currentUser = database.users.find((user)=>user.name===req.params.username)
    currentUser ? res.send(currentUser.city) : res.sendStatus(404)
})


app.listen(port, ()=>{
    console.log("Server has started!")
})

