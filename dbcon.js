let mongoose = require ("mongoose")
let constring = "mongodb+srv://paarth23cse:w5LgHsxviJgVsHx7@cse2.zlj1z.mongodb.net/?retryWrites=true&w=majority&appName=CSE2"
let dbconnect = async ()=>{
try{await mongoose.connect(constring, {});
console.log("database is connected")
}
catch(err)
{console.log("error"+err)}
}

module.exports = dbconnect;