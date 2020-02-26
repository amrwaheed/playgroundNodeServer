 require("dotenv").config();
const express = require("express")
const app = express()
const mongoose =require("mongoose");
const cors = require('cors')
const authUserController =require("./Controller/authUserController") 
const authOwnerController =require("./Controller/authOwnerController") 
const userRouter = require("./Routes/userRouter") 
const ownerRouter = require("./Routes/ownerRouter")
const userBookingRouter = require("./Routes/userBookingRouter") 
const ownerBookingRouter = require("./Routes/ownerBookingRouter") 
const governorateRouter = require("./Routes/governorateRouter") 
const playgroundRouter = require("./Routes/playgroundRouter") 
const cityRouter = require("./Routes/cityRouter") 
const categoriesRouter = require("./Routes/categoriesRouter")
const contactusRouter = require("./Routes/contactUsRouter")
const resetPasswordRouter = require('./Controller/resetPassword'); 

const availableHoursRouter = require('./Routes/availableHours')
// dotenv.config();
app.use(cors());
//create a cors middleware
app.use(function(req, res, next) {
    //set headers to allow cross origin request.
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

//connect To The Database 
mongoose.connect(process.env.DB_CONNECT,{useUnifiedTopology: true, useNewUrlParser: true},()=>console.log('connected to Database ...'))
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
//importing Routes

// Middlewares
app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }));
// Make "public" Folder Publicly Available
app.use('/public', express.static('public'));


app.use('/api',governorateRouter);
app.use('/api',cityRouter);
app.use('/api',resetPasswordRouter);
app.use('/api',contactusRouter);

//Route Middleware
app.use('/api/auth/user',authUserController);
app.use('/api/auth/owner',authOwnerController);

app.use('/api/owner',ownerRouter);

app.use('/api',categoriesRouter);
app.use('/api',playgroundRouter);
app.use('/api/user',userBookingRouter);
app.use('/api/owner',ownerBookingRouter);
app.use('/api/user',userRouter);

app.use('/api',availableHoursRouter);


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
