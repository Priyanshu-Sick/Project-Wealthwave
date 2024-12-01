let express = require("express")

let app = express()

app.listen("3000", ()=>{
    console.log("server is connected")
}
)

let dbconnect = require("./dbconnect/dbcon.js")

dbconnect()

//const saveDOC = require("./model.js")
//saveDOC()