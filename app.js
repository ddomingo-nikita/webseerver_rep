import express from "express"

const app = express()

const port = 3001

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}))
app.get("/", (req, res)=>{

    res.sendFile("index.html")
})

app.post("/api/login", (req, res) => {
    const name = req.body.username;
    const password = req.body.password;
    if(name === "Nikita" && password === "123"){
        res.send("you are logged in")
    }
    else{
        res.send("Wrong info")
    }

})


app.listen(port, ()=>{
    console.log("Server has started!")
})

