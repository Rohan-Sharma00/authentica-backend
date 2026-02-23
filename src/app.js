const express = require("express");
const server = express();

// TOdo - use env variables and dotenv libray
server.listen(3000);

let userDataArr = [
    {
        id: "1",
        name: "rohan",
        email: "rohan@gmail.com",
        role: "admin",
        status: "active",
        createdAt: new Date()
    },
    {
        id: "2",
        name: "sandesh",
        email: "sandesh@gmail.com",
        role: "user",
        status: "inactive",
        createdAt: new Date()
    }
];

server.use(express.json());

server.use("/", (req, res, next) => {
    console.log(JSON.stringify(req.headers));
    if(!req.headers["x-auth-token"] || req.headers["x-auth-token"]!="secret123"){
        res.status(400).send("unauthorized user");
    }else{
        next();

    }
    
});

// get all user apis
server.get("/api/users", (req, res) => {
    res.status(200).send(userDataArr);
});


// get single  user by id
server.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const userObj = userDataArr.filter((user) => {
        if (user.id == userId) {
            return user;
        }
    });
    if (userObj.length)
        res.status(200).send(userObj[0]);
    else
        res.status(404).send("No user available by this id");
});

// Create new user
server.post("/api/users", (req, res) => {
    // res.send("working");
    const data = req.body;
    console.log("data = ", data);
    try {

        if (data.name.length < 3) {
            res.status(400).send("Bad Request");
        } else {
            data["id"] = userDataArr.length + 1;
            data["createdAt"] = new Date();
            console.log("data = ", data);
            userDataArr.push(data);
            res.status(201).send(data);
        }

    } catch (error) {
        throw new Error("error while adding data");
    }
});

// Update user
server.put("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    let userObjIndex=-1;
     for(let i=0;i<userDataArr.length;i++){
        if(userDataArr[i].id==userId){
           userObjIndex=i;
           break;
        }
     }
     console.log("userObjIndex = ",userObjIndex);
    if (userObjIndex && userObjIndex!=-1){
        const userObj={...userDataArr[userObjIndex] , ...req.body};
        console.log("userDataArr[userObjIndex] = ",userDataArr[userObjIndex]);
        userObj["id"]=userDataArr[userObjIndex].id;
        userObj["createdAt"]=userDataArr[userObjIndex].createdAt;

        console.log("new user obj",userObj);
        let userArr=userDataArr.filter((user)=>{return user.id != userId});
        userArr.push(userObj);
        console.log("new user arr = ",userArr);
        userDataArr=userArr;
        console.log("userDataArr = ",userDataArr);
        res.status(200).send(userDataArr);
    }
    else{
        res.status(404).send("No user available by this id");
    }
});

// Delete user
server.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    let tempArr=userDataArr.filter((user)=>{return user.id!=userId});
    if(tempArr.length == userDataArr.length){
        res.status(404).send("user id is not present");
    }else{
        userDataArr=tempArr;
    res.status(200).send("Delete user successfully");
    }
});

server.use("/", (error, req, res, next) => {
    res.status(500).send("Internal server error = ",error);
});

