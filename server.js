 require("dotenv").config();
const express = require("express")
const app = express()
const mongoose =require("mongoose");
const authController =require("./Controller/auth") 
const cors = require('cors')
const authRouter = require("./Routes/authRoute")
// dotenv.config();
app.use(cors());


//connect To The Database 
mongoose.connect(process.env.DB_CONNECT,{useUnifiedTopology: true, useNewUrlParser: true},()=>console.log('connected to Database ...')
)
mongoose.set('useCreateIndex', true);

//importing Routes

// Middlewares
app.use(express.json())


//Route Middleware
app.use('/api/user',authController);

app.use('/api',authRouter);



const port ="5000"
app.listen(port,console.log(`server up and running on port ${port}`))