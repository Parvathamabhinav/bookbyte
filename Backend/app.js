const express=require("express")
const app=express();
const cors=require("cors");
app.use(express.json())
app.use(cors());
require("dotenv").config();
require("./conn/conn")
const User=require("./routes/user")
const Books=require("./routes/book")
const Favourite=require("./routes/favourite")
const Cart=require("./routes/cart")
const Order=require("./routes/order")
app.use("/api/v1",User)
app.use("/api/v1",Books)
app.use("/api/v1",Favourite)
app.use("/api/v1",Cart)
app.use("/api/v1",Order)

app.get("/",(req,res)=>{
    res.send("Hello from backend ")
})
app.listen(process.env.port,()=>{
    console.log(`Server started at ${process.env.port}`);
})