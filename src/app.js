const express=require("express");
const server=express();

// TOdo - use env variables and dotenv libray
server.listen(3000);

server.use("/",(req,res)=>{
    res.send("API is working");
});

// get all user apis
server.get("/api/users",(req,res)=>{
    res.send("get all user apis");
});

 
// get single  user by id
server.get("/api/users/:id",(req,res)=>{
    res.send("get single  user by id");
});

// Create new user
server.post("/api/users",(req,res)=>{
    res.send("Create new user");
});

// Update user
server.put("/api/users/:id",(req,res)=>{
    res.send("Update user");
});

// Delete user
server.delete("/api/users/:id",(req,res)=>{
    res.send("Delete user");
});

server.use("/",(error,req,res,next)=>{
  res.status(500).send("Internal server error");
});

