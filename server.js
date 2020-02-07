 require("dotenv").config();
const express = require("express")
const app = express()
const mongoose =require("mongoose");
const cors = require('cors')
const authUserController =require("./Controller/authUser") 
const authOwnerController =require("./Controller/authOwner") 
const authRouter = require("./Routes/authRoute")
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
app.use('/api/user',authUserController);
app.use('/api/owner',authOwnerController);

app.use('/api',authRouter);

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