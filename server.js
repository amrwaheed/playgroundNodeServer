 require("dotenv").config();
const express = require("express")
const app = express()
const mongoose =require("mongoose");
const cors = require('cors')
const authUserController =require("./Controller/authUserController") 
const authOwnerController =require("./Controller/authOwnerController") 
const userRouter = require("./Routes/userRouter") 
const ownerRouter = require("./Routes/ownerRouter") 
// dotenv.config();
app.use(cors());


//connect To The Database 
mongoose.connect(process.env.DB_CONNECT,{useUnifiedTopology: true, useNewUrlParser: true},()=>console.log('connected to Database ...')
)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
//importing Routes

// Middlewares
app.use(express.json())


//Route Middleware
app.use('/api/auth/user',authUserController);
app.use('/api/auth/owner',authOwnerController);

app.use('/api/user',userRouter);
app.use('/api/owner',ownerRouter);

//last MW
app.use((request,response,next)=>{
    response.status(404).send("Url Not Coreected ... ")
});


/// c- Error mw
/// To Handle Errors
app.use( (error,request,response,next) => {

    response.send(error.message+"");
});


const port ="5000"
app.listen(port,console.log(`server up and running on port ${port}`))