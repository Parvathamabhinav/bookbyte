const router = require("express").Router();
const User=require("../models/user")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Book=require("../models/book")
const {authenticateToken}=require("./userAuth")
//add book --admin
router.post("/add-book",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const user=await User.findById(id);
        if(user.role!=="admin"){
            return res.status(400).json({message:"You are not having access to perform admin work"});
        }
        const book= new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
        await book.save();
        res.status(200).json({message:"Book added succesfully"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})
//update book
router.put("/update-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        
        return res.status(200).json({message:"Book updated succesfully"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})
//delete book
router.put("/delete-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.json({message:"Book deleted"})
    }catch(error){
        return res.status(400).json({message:"Internal server problem"})
    }
})
//get all books
router.get("/get-all-books",async(req,res)=>{
    try{
        //find() will get all books
        const books=await Book.find()//limit(1);//created at -1 implies the books that are recently created
        console.log(books.length)
        return res.json({
            status:"Success",
            data:books,
        });
    }catch(error) { 
        console.error("Error fetching books:", error); // Log the actual error
        return res.status(500).json({ message: "Internal error", error: error.message });
    }
})
//get recently added books
router.get("/get-recent-books",async(req,res)=>{
    try{
        //find() will get all books
        const books=await Book.find().sort({createdAt:-1}).limit(2);//created at -1 implies the books that are recently created
        return res.json({
            status:"Success",
            data:books,
        });
    }catch(error) { 
        return res.json({message:"Internal error"})
    }
})
//get particular book by id
router.get("/get-book-by-id/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const book=await Book.findById(id);
        return res.json({
            status:"Success",
            data:book,
        });
    }catch(error) { 
        return res.json({message:"Internal error"})
    }
})

module.exports=router;