// const name = "Shardha kapoor";
// const age = 22;
// const discription = "she is vey good nature actress";

// module.exports = {name,age,discription};

import express from "express";
const app = express();

app.get("/",(req,res)=>{
    res.send(`
        <ol>
            <li>html</li>
            <li>css</li>
            <li>javascript</li>
            <li>react</li>
            <li>node</li>
            <li>express</li>
            <li>mongo</li>
            <li>tailwind</li>
            <li>bootstrap</li>
        </ol>
        `)
})
app.get("/home",(req,res)=>{
    res.send(`
        <ol>
            <li>html</li>
            <li>css</li>
            <li>javascript</li>
        </ol>
        `)
})


app.listen(3000,()=>{
    console.log("server is running on port 3000");
})  
